import express, { NextFunction, Request, Response } from 'express'
import { addRoom, deleteRoom, editRoom, getRoom, getRooms } from '../services/room'
import { ErrorApp } from '../classes/ErrorApp'

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
        if (dataRooms === undefined || dataRooms === null) {
            throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
        } else {
            res.json(dataRooms)
        }


    } catch (error: any) {
        next(error)
    }
})

roomController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataRoom = await deleteRoom((req.params.id))
        if (dataRoom == null) {
            throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
        } else {
            res.json(`room with id: ${req.params.id} has been deleted`)
        }


    } catch (error: any) {
        next(error)
    }
})

roomController.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataRoom = await editRoom((req.params.id), req.body)
        if (dataRoom == null) {
            throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
        } else {
            res.json(dataRoom)
        }
        
        
    } catch (error: any) {
        next(error)
    }
})

roomController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataRoom = await addRoom(req.body)
        if (dataRoom == null || dataRoom == undefined) {
            throw new ErrorApp({ status: 400, message: 'Error trying to create new room' })
        }
        res.json(dataRoom)
    } catch (error: any) {
        next(error)
    }
})