import { readData, writeData } from "../util/dataExtract";
import { BookingInterface } from "../interfaces/Booking";
import { ErrorApp } from "../classes/ErrorApp";
import { bookingModel } from "../schemas/BookingSchema";






export const getBookings = async (): Promise<BookingInterface[]> => {
    const bookingsData = await bookingModel.find({}).populate('room')
    return bookingsData
}

export const getBooking = async (id: any): Promise<BookingInterface | null> => {
    const booking = await bookingModel.findById(id).populate('room')

    if (booking === undefined || booking === null) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {
        return booking
    }

}

export const deleteBooking = async (id: any): Promise<string> => {
    const bookingData = await bookingModel.findByIdAndDelete(id)
    if (bookingData == null) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {
        return `Booking with id: ${id} has been deleted`
    }

}

export const addBooking = async (booking: BookingInterface): Promise<BookingInterface> => {

    if (booking === null || booking === undefined) {
        throw new ErrorApp({ status: 400, message: 'Error trying to create new booking' })
    }
    const bookingData = (await bookingModel.create(booking)).populate('room')
    return bookingData
}

export const editBooking = async (id: any, booking: BookingInterface): Promise<BookingInterface> => {
    const bookingData = await bookingModel.findByIdAndUpdate(id, booking, {new: true}).populate('room')
    if (bookingData == null) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {
        return bookingData
    }
}