import express, { Request, Response } from "express";
import path from "path";

export const homeRouter = express.Router();

homeRouter.get('/', (_req: Request, res: Response) => {
    res.sendFile(path.resolve(process.cwd(), 'index.html'));
});