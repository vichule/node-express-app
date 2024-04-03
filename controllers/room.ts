import express, { NextFunction, Request, Response } from 'express'
import { addRoom, deleteRoom, editRoom, getRoom, getRooms } from '../services/room'
import { authToken } from '../middleware/auth'

export const roomController = express.Router()

roomController.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(getRooms(res))
    } catch (error) {
        next(error)
    }
})

roomController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(getRoom(Number(req.params.id),res))
    } catch (error) {
        next(error)
    }
})

roomController.delete('/:id',authToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(deleteRoom(Number(req.params.id),res))
    } catch (error) {
        next(error)
    }
})

roomController.put('/:id',authToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(editRoom(Number(req.params.id), req.body,res))
    } catch (error) {
        next(error)
    }
})

roomController.post('/',authToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(addRoom(req.body,res))
    } catch (error) {
        next(error)
    }
})