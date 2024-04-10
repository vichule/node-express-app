import { BookingInterface } from "../interfaces/Booking";
import { ErrorApp } from "../classes/ErrorApp";
import { bookingModel } from "../schemas/BookingSchema";






export const getBookings = async (): Promise<BookingInterface[]> => {
    try {
        const bookingsData = await bookingModel.find({}).populate('room')
        return bookingsData
    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })
    }

}

export const getBooking = async (id: any): Promise<BookingInterface | null> => {

    try {
        return (await bookingModel.findById(id).populate('room'))
    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })
    }



}

export const deleteBooking = async (id: any): Promise<BookingInterface | null> => {
    try {
        return (await bookingModel.findByIdAndDelete(id))

    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })
    }



}

export const addBooking = async (booking: BookingInterface): Promise<BookingInterface> => {
    try {
        return (await bookingModel.create(booking)).populate('room')
    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })

    }

}

export const editBooking = async (id: any, booking: BookingInterface): Promise<BookingInterface | null> => {
    try {
        return (await bookingModel.findByIdAndUpdate(id, booking, { new: true }).populate('room'))

    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })

    }

}