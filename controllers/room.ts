import express, { NextFunction, Request, Response } from 'express'
import { addRoom, deleteRoom, editRoom, getRoom, getRooms } from '../services/room'

export const roomController = express.Router()

roomController.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const dataRooms = await getRooms()
        res.json(dataRooms)
    } catch (error: any) {
        next(error)
    }
})

roomController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataRooms = await getRoom((req.params.id))
        res.json(dataRooms)
    } catch (error: any) {
        next(error)
    }
})

roomController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataRoom = await deleteRoom((req.params.id))
        res.json(dataRoom)
    } catch (error: any) {
        next(error)
    }
})

roomController.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataRoom = await editRoom((req.params.id), req.body)
        res.json(dataRoom)
    } catch (error: any) {
        next(error)
    }
})

roomController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataRoom = await addRoom(req.body)
        res.json(dataRoom)
    } catch (error: any) {
        next(error)
    }
})