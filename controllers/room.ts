import express, { NextFunction, Request, Response } from 'express'
import { addRoom, deleteRoom, editRoom, getRoom, getRooms } from '../services/room'
import { authToken } from '../middleware/auth'

export const roomController = express.Router()

roomController.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(getRooms())
    } catch (error) {
        next(error)
    }
})

roomController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(getRoom(Number(req.params.id)))
    } catch (error) {
        next(error)
    }
})

roomController.delete('/:id',authToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(deleteRoom(Number(req.params.id)))
    } catch (error) {
        next(error)
    }
})

roomController.put('/:id',authToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(editRoom(Number(req.params.id), req.body))
    } catch (error) {
        next(error)
    }
})

roomController.post('/',authToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(addRoom(req.body))
    } catch (error) {
        next(error)
    }
})