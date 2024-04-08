import { readData, writeData } from "../util/dataExtract";
import { BookingInterface } from "../interfaces/Booking";
import { ErrorApp } from "../classes/ErrorApp";



export const getBookings = (): BookingInterface[] => {
    const bookingsData = readData('./data/bookings.json') as BookingInterface[]
    return bookingsData
}

export const getBooking = (id: number): BookingInterface | string => {
    const booking = getBookings().find(element => element.id === id)
    if (booking === undefined || booking === null) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {
        return booking
    }
}

export const deleteBooking = (id: number): string => {
    const bookingsData = getBookings()
    const bookingID = bookingsData.findIndex(element => element.id === id)
    if (bookingID === -1) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {
        bookingsData.splice(bookingID, 1)
        writeData('./data/bookings.json', JSON.stringify(bookingsData))
        return `Booking with id: ${id} has been deleted`
    }

}

export const addBooking = (booking: BookingInterface): string => {
    const bookingsData = getBookings()
    if (booking === null || booking === undefined) {
        throw new ErrorApp({ status: 400, message: 'Error trying to create new booking' })
    }
    bookingsData.push(booking)
    writeData('./data/bookings.json', JSON.stringify(bookingsData))
    return 'Booking added successfully'
}

export const editBooking = (id: number, booking: BookingInterface): string => {
    const bookingsData = getBookings()
    const bookingID = bookingsData.findIndex(element => element.id === id)
    if (bookingID === -1) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {
        bookingsData.splice(bookingID, 1)
        bookingsData.push(booking)
        writeData('./data/bookings.json', JSON.stringify(bookingsData))
        return 'Booking edited successfully'
    }
}