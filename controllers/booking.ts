import express, { NextFunction, Request, Response } from 'express'
import { addBooking, deleteBooking, editBooking, getBooking, getBookings } from '../services/booking'
import { ErrorApp } from '../classes/ErrorApp'

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
        const dataBooking = await deleteBooking(req.params.id)
        res.json(`Booking with id: ${req.params.id} has been deleted`)

    } catch (error: any) {
        next(error)
    }
})

bookingController.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataBooking = await editBooking((req.params.id), req.body)
        res.json(dataBooking)

    } catch (error: any) {
        next(error)
    }
})

bookingController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataBooking = await addBooking(req.body)
        res.json(dataBooking)
    } catch (error: any) {
        next(error)
    }
})
