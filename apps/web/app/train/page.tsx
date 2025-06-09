"use client"

import {useState} from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { UploadModal } from "@/components/ui/upload"
import { TrainModel, GenerateImage, GenerateImagesFromPack } from "common/inferred"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"


export default function Train(){
  const { getToken } = useAuth()
  const router = useRouter()
  const [ zipUrl, setZipUrl  ] = useState("")
  const [ type, setType ] = useState("Male")
  const [ age, setAge ] = useState<string>()
  const [ ethinicity, setEthinicity ]= useState<string>()
  const [ eyeColor, setEyeColor] = useState<string>()
  const [ bald, setBald ] =  useState(false)
  const [ name, setName ] = useState("")


  async function trainModal(){
    const input = {
      zipUrl,
      type,
      age: parseInt(age ?? "0"),
      ethinicity,
      eyeColor,
      bald,
      name
    }

    const token = await getToken()
    const response = await axios.post(`${BACKEND_URL}/ai/training`, input, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    router.push("/")
  }

    return (
<div className="flex flex-col items-center justify-center p-26 mx-auto">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of the model" onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Type</Label>
                        <Select onValueChange={(value) => {
                            setType(value)
                        }}>
                            <SelectTrigger id="name">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="Man">Man</SelectItem>
                                <SelectItem value="Woman">Woman</SelectItem>
                                <SelectItem value="Others">Others</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
            
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="age">Age</Label>
                <Input id="age" placeholder="Age of the person" onChange={(e) => {setAge(e.target.value)}}></Input>
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Ethinicity">Ethinicity</Label>
                <Select onValueChange={(value) => {setEthinicity(value)}}>
                <SelectTrigger id="ethinicity">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="White">White</SelectItem>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="Asian_American">Asian American</SelectItem>
                  <SelectItem value="East_Asian">East Asian</SelectItem>
                  <SelectItem value="South_East_Asian">South East Asian</SelectItem>
                  <SelectItem value="South_Asian">South Asian</SelectItem>
                  <SelectItem value="Middle_Eastern">Middle Eastern</SelectItem>
                  <SelectItem value="Pacific">Pacific</SelectItem>
                  <SelectItem value="Hispanic">Hispanic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="eyeColor">Eye Color</Label>
                <Select onValueChange={(value) => {setEyeColor(value)}}>
                    <SelectTrigger id="eyeColor">
                    <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                    <SelectItem value="Brown">Brown</SelectItem>
                    <SelectItem value="Blue">Blue</SelectItem>
                    <SelectItem value="Green">Green</SelectItem>
                    <SelectItem value="Hazel">Hazel</SelectItem>
                    <SelectItem value="Amber">Amber</SelectItem>
                    <SelectItem value="Gray">Gray</SelectItem>
                    <SelectItem value="Heterochromia">Heterochromia (Different colors)</SelectItem>
                    <SelectItem value="Other">Other/Unknown</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div>
                    <Label htmlFor="bald">Bald</Label>
                    <Switch onClick={(e) => {setBald(!bald)}}/>
                </div>
          </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => {
                    router.push("/")
                }}>Cancel</Button>
        <Button disabled={!zipUrl || !type || !age || !ethinicity || !eyeColor } onClick={trainModal}>Create Model</Button>
      </CardFooter>
    </Card>
    </div>
  )
}