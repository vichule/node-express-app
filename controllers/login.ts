import express, { NextFunction, Request, Response } from 'express'
import { generateAccessToken } from '../middleware/auth'

export const authRouter = express.Router()

authRouter.get("/", (_req: Request, res: Response) => {
    const token = generateAccessToken('userAdmin')
    res.json(token)
})