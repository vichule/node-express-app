import express, { NextFunction, Request, Response } from 'express'
import { addBooking, deleteBooking, editBooking, getBooking, getBookings } from '../services/booking'

export const bookingController = express.Router()

bookingController.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(getBookings())
    } catch (error) {
        next(error)
    }
})

bookingController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(getBooking(Number(req.params.id)))
    } catch (error) {
        next(error)
    }
})

bookingController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(deleteBooking(Number(req.params.id)))
    } catch (error) {
        next(error)
    }
})

bookingController.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(editBooking(Number(req.params.id), req.body))
    } catch (error) {
        next(error)
    }
})

bookingController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(addBooking(req.body))
    } catch (error) {
        next(error)
    }
})
