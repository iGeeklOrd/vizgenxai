import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1]

    if(!token){
        res.json({
            message: "Error token."
        })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.AUTH_JWT_KEY!, {
            algorithms: ['RS256'] 
        }) as { sub?: string }

        if(decoded.sub){
            next()
            req.userId = decoded.sub
        }
       
    } catch(e) {
        res.status(403).json({
            message: "Error while decoding"
        })
    }
}