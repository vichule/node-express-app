import express, { NextFunction, Request, Response } from 'express'

export const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err)
    return res.status(500).json({error: true, message: 'Error'})
})