import express from "express";
import { TrainModel, GenerateImage, GenerateImagesFromPack,  } from "common/types";
import { prismaClient } from "db";
import { S3Client } from "bun";
import { FalAIModel } from "./models/FalAIModel";
import cors from "cors"
import { authMiddleware } from "./middleware";

const port = process.env.PORT || 8080

const falAiModel = new FalAIModel()

const app = express()
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true // If you need cookies/auth
}));

app.get("/pre-signed-url", async (req, res) => {
    try{
        const key = `models/${Date.now()}_${Math.random()}.zip`
        const url =  S3Client.presign(key, {
            method: "PUT",
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY,
            endpoint: process.env.ENDPOINT,
            bucket: process.env.BUCKET_NAME,
            expiresIn:60*5,
            type: "application/zip"
    })

    res.json({
        url,
        key
    })
    }

    catch(error){
        console.error("Error generating pre-signed URL:", error);
        res.status(500).json({ error: "Failed to generate pre-signed URL" });
    } 
})

app.get("/", (req, res) => {
 
})

app.post("/ai/training", authMiddleware, async (req, res) => {
    const parsedData = TrainModel.safeParse(req.body)
    const image = req.body.images

    if(!parsedData.success){
        res.status(411).json({
            message: "Input incorrect"
        })
        return
    }

    const { request_id, response_url } = await falAiModel.trainModel("", parsedData.data.name)

    const data = await prismaClient.model.create({
        data: {
            name: parsedData.data.name,
            type: parsedData.data.type,
            age: parsedData.data.age,
            ethinicity: parsedData.data.ethinicity,
            eyeColor: parsedData.data.eyeColor,
            bald: parsedData.data.bald,
            userId: req.userId!,
            zipUrl: parsedData.data.zipUrl,
            falAiRequestId: request_id
        }
    })

    res.json({
        modelId: data.id
    })
})

app.post("/ai/generate", authMiddleware, async (req, res) => {
    const parsedData = GenerateImage.safeParse(req.body)

    if(!parsedData.success){
        res.status(411).json({
            message: "Incorrect input"
        })
        return
    }

    const model = await prismaClient.model.findUnique({
        where: {
            id: parsedData.data.modelId
        }
    })

    if(!model || !model.tensorPath){
        res.status(411).json({
            message: "Model not found."
        })
        return
    }
    
    const { request_id, response_url } = await falAiModel.generateImage(parsedData.data.prompt, model.tensorPath)

    const data = await prismaClient.outputImages.create({
        data: {
            prompt: parsedData.data.prompt,
            userId: req.userId!,
            modelId: parsedData.data.modelId,
            imageUrl: "",
            falAiRequestId: request_id
        }
    })

    res.json({
        imageId: data.id
    })
})

app.post("/pack/generate", authMiddleware, async (req, res) => {
    const parsedData = GenerateImagesFromPack.safeParse(req.body)

    if(!parsedData.success){
        res.status(411).json({
            message: "Incorrect input"
        })
        return
    }

    const prompts = await prismaClient.packPrompts.findMany({
        where: {
            packId: parsedData.data.packId
        }
    })

    let requestIds: { request_id: string }[] = await Promise.all(prompts.map((prompt) => falAiModel.generateImage(prompt.prompt, parsedData.data.modelId)))

    const images = await prismaClient.outputImages.createManyAndReturn({
        data: prompts.map((prompt, index) => ({
            prompt: prompt.prompt,
            userId: req.userId!,
            modelId: parsedData.data.modelId,
            imageUrl: "",
            falAiRequestId: requestIds[index]?.request_id
        }))
    })

    res.json({
        images: images.map((images) => images.id)
    })
})

app.post("/pack/bulk", async (req, res) => {
    const parsedData = GenerateImagesFromPack.safeParse(req.body)

    if(!parsedData.success){
        res.status(411).json({
            message: "Incorrect input"
        })
        return
    }

    const packs = await prismaClient.packs.findMany({

    })

    res.json({
        packs
    })
})

app.get("/image/bulk", authMiddleware, async (req, res) => {
    const images = req.query.images as string[]
    const limit = req.query.limit as string ?? "10"
    const offset = req.query.offset as string ?? "0"

    const imagesData = await prismaClient.outputImages.findMany({
        where: {
            id: {in: images},
            userId: req.userId
        },
        skip: parseInt(offset),
        take: parseInt(limit)
    })

    res.json({
        images: imagesData
    })
})


app.post("/fal-ai/webhook/train", async (req, res) => {
    console.log(req.body)

    const requestId = req.body.request_id as string

    await prismaClient.model.updateMany({
        where: {
            falAiRequestId: requestId
        }, 
        data: {
            trainingStatus: "Generated",
            tensorPath: req.body.tensorPath
        }
    })

    res.json({
        message: "Webhook received"
    })
})

app.post("/fal-ai/webhook/image", async (req, res) => {
    console.log(req.body)

    const requestId = req.body.request_id

    await prismaClient.outputImages.updateMany({
        where: {
            falAiRequestId: requestId
        }, 
        data: {
            status: "Generated",
            imageUrl: req.body.image_url
        }
    })

    res.json({
        message: "Webhook received"
    })
 
})


app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
