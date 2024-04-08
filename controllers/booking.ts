import express, { NextFunction, Request, Response } from 'express'
import { addBooking, deleteBooking, editBooking, getBooking, getBookings } from '../services/booking'

export const bookingController = express.Router()

bookingController.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    
    try {
        const dataBookings = await getBookings()
        res.json(dataBookings)
    } catch (error: any) {
        next(error)
    }
})

bookingController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataBookings = await getBooking(req.params.id)
        res.json(dataBookings)
    } catch (error: any) {
        next(error)
    }
})

bookingController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(deleteBooking(req.params.id))
    } catch (error: any) {
        next(error)
    }
})

bookingController.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(editBooking((req.params.id), req.body))
    } catch (error: any) {
        next(error)
    }
})

bookingController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(addBooking(req.body))
    } catch (error: any) {
        next(error)
    }
})
