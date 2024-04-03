import { readData, writeData } from "../util/dataExtract";
import { BookingInterface } from "../interfaces/Booking";
import { Response } from "express";
//const data = './data/bookings.json'

const bookingsData = readData('./data/bookings.json') as BookingInterface[]

export const getBookings = (res: Response): BookingInterface[] | string => {
    if (bookingsData === undefined || bookingsData.length === 0) {
        res.status(404)
        return 'Error, there is no data'
    } else {
        return bookingsData
    }

}

export const getBooking = (id: number, res: Response): BookingInterface | string => {
    const booking = bookingsData.find(element => element.id === id)
    if (booking === undefined || booking === null) {
        res.status(404)
        return 'Error, booking doesnt exist'
    } else {
        return booking
    }
}

export const deleteBooking = (id: number, res: Response): string => {
    const bookingID = bookingsData.findIndex(element => element.id === id)
    if (bookingID === -1) {
        res.status(404)
        return 'Error, the booking doesnt exist'
    } else {
        bookingsData.splice(bookingID, 1)
        writeData('./data/bookings.json', JSON.stringify(bookingsData))
        return `Booking with id: ${id} has been deleted`
    }

}

export const addBooking = (booking: BookingInterface, res: Response): string => {
    if (booking === null || booking === undefined) {
        res.status(400)
        return 'Error trying to create new booking'
    }
    bookingsData.push(booking)
    writeData('./data/bookings.json', JSON.stringify(bookingsData))
    return 'Booking added successfully'
}

export const editBooking = (id: number, booking: BookingInterface, res: Response): string => {
    const bookingID = bookingsData.findIndex(element => element.id === id)
    if (bookingID === -1) {
        res.status(404)
        return 'Error, the booking doesnt exist'
    } else {
        bookingsData.splice(bookingID, 1)
        bookingsData.push(booking)
        writeData('./data/bookings.json', JSON.stringify(bookingsData))
        return 'Booking edited successfully'
    }
}