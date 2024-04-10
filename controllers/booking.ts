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
        if (dataBookings === undefined || dataBookings === null) {
            throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
        } else {
            res.json(dataBookings)
        }

    } catch (error: any) {
        next(error)
    }
})

bookingController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataBooking = await deleteBooking(req.params.id)
        if (dataBooking === null) {
            throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
        } else {
            res.json(`Booking with id: ${req.params.id} has been deleted`)
        }


    } catch (error: any) {
        next(error)
    }
})

bookingController.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataBooking = await editBooking((req.params.id), req.body)
        if (dataBooking == null) {
            throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })

        } else {
            res.json(dataBooking)
        }


    } catch (error: any) {
        next(error)
    }
})

bookingController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataBooking = await addBooking(req.body)
        if (dataBooking === null || dataBooking === undefined) {
            throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })

        }
        res.json(dataBooking)
    } catch (error: any) {
        next(error)
    }
})
