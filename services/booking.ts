import { readData, writeData } from "../util/dataExtract";
import { BookingInterface } from "../interfaces/Booking";
 //const data = './data/bookings.json'

const bookingsData = readData('./data/bookings.json') as BookingInterface[]

export const getBookings = (): BookingInterface[] | string => {
    if(bookingsData === undefined || bookingsData.length === 0){
        return 'Error, there is no data'
    }else{
        return bookingsData
    }
    
}

export const getBooking = (id: number): BookingInterface | string => {
    const booking = bookingsData.find(element => element.id === id)
    if(booking === undefined || booking === null){
        return 'Error, booking doesnt exist'
    }else{
        return booking
    }
}

export const deleteBooking = (id: number): string => {
    const bookingID = bookingsData.findIndex(element => element.id === id)
    bookingsData.splice(bookingID, 1)
    writeData('./data/bookings.json', JSON.stringify(bookingsData))
    return `Booking with id: ${id} has been deleted`
}