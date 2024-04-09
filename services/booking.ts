import { readData, writeData } from "../util/dataExtract";
import { BookingInterface } from "../interfaces/Booking";
import { ErrorApp } from "../classes/ErrorApp";
import { bookingModel } from "../schemas/BookingSchema";






export const getBookings = async (): Promise<BookingInterface[]> => {
    const bookingsData = await bookingModel.find({})
    return bookingsData
}

export const getBooking = async (id: any): Promise<BookingInterface | null> => {
    const booking = await bookingModel.findById(id)

    if (booking === undefined || booking === null) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {
        return booking
    }

}

export const deleteBooking = async (id: any): Promise<string> => {
    const bookingID = await bookingModel.findByIdAndDelete(id)
    if (bookingID == null) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {
        return `Booking with id: ${id} has been deleted`
    }

}

export const addBooking = async (booking: BookingInterface): Promise<BookingInterface> => {

    if (booking === null || booking === undefined) {
        throw new ErrorApp({ status: 400, message: 'Error trying to create new booking' })
    }
    const bookingID = await bookingModel.create(booking)
    return bookingID
}

export const editBooking = async (id: any, booking: BookingInterface): Promise<BookingInterface> => {
    const bookingID = await bookingModel.findByIdAndUpdate(id, booking, {new: true})
    if (bookingID == null) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {
        return bookingID
    }
}