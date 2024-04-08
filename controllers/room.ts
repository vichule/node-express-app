import express, { NextFunction, Request, Response } from 'express'
import { addRoom, deleteRoom, editRoom, getRoom, getRooms } from '../services/room'

export const roomController = express.Router()

roomController.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(getRooms())
    } catch (error: any) {
        next(error)
    }
})

roomController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(getRoom(Number(req.params.id)))
    } catch (error: any) {
        next(error)
    }
})

roomController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(deleteRoom(Number(req.params.id)))
    } catch (error: any) {
        next(error)
    }
})

roomController.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(editRoom(Number(req.params.id), req.body))
    } catch (error: any) {
        next(error)
    }
})

roomController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(addRoom(req.body))
    } catch (error: any) {
        next(error)
    }
})