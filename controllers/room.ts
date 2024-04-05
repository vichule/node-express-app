import express, { NextFunction, Request, Response } from 'express'
import { addRoom, deleteRoom, editRoom, getRoom, getRooms } from '../services/room'

export const roomController = express.Router()

roomController.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200)
        res.json(getRooms())
    } catch (error) {
        next(error)
    }
})

roomController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200)
        res.json(getRoom(Number(req.params.id)))
    } catch (error) {
        next(error)
    }
})

roomController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200)
        res.json(deleteRoom(Number(req.params.id)))
    } catch (error) {
        next(error)
    }
})

roomController.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200)
        res.json(editRoom(Number(req.params.id), req.body))
    } catch (error) {
        next(error)
    }
})

roomController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(addRoom(req.body))
    } catch (error) {
        next(error)
    }
})