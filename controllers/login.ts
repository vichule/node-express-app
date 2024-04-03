import express, {  Request, Response } from 'express'
import { generateAccessToken } from '../middleware/auth'

export const authRouter = express.Router()

authRouter.get("/", (req: Request, res: Response) => {
    const { username, password } = req.body

    if(username === 'admin@admin.co' && password === 'adminadmin'){
        const token = generateAccessToken(username)
        return res.json(token)
    }else{
        return res.json('Wrong credentials')
    }
    
})