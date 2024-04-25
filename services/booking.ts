import { BookingInterface } from "../interfaces/Booking";
import { ErrorApp } from "../classes/ErrorApp";
import { bookingModel } from "../models/BookingModel";
import { connect, disconnect } from "../util/connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";






export const getBookings = async (): Promise<BookingInterface[]> => {
        return await bookingModel.find({}).populate('room')

}

export const getBooking = async (id: any): Promise<BookingInterface | null> => {

        const bookingData = (await bookingModel.findById(id).populate('room'))
    if (bookingData === null) {
        throw new ErrorApp({ status: 404, message: 'Error, booking does not exist' })
    }else{
        return bookingData
    }



}

export const deleteBooking = async (id: any): Promise<RowDataPacket> => {
    
    const conn = await connect()
    const query = `DELETE FROM bookings where id = ?`
    const prepared = await conn.prepare(query)
    const [results, fields] = await prepared.execute([id])
    const resultHeaders = results as ResultSetHeader
    const bookingData = results as RowDataPacket
    conn.unprepare(query)
    disconnect(conn)
    if (resultHeaders.affectedRows === 0) {
        throw new ErrorApp({ status: 404, message: 'Error, booking does not exist' })
    } else {
        return bookingData
    }


}

export const addBooking = async (booking: BookingInterface): Promise<BookingInterface> => {
        const bookingData = (await bookingModel.create(booking)).populate('room')
    if(bookingData === null){
        throw new ErrorApp({ status: 404, message: 'Error, booking does not exist' })
    }else{
        return bookingData
    }

}

export const editBooking = async (id: any, booking: BookingInterface): Promise<BookingInterface | null> => {
    const bookingData = (await bookingModel.findByIdAndUpdate(id, booking, { new: true }).populate('room'))

    if(bookingData === null){
        throw new ErrorApp({ status: 404, message: 'Error, booking does not exist' })
    }else{
        return bookingData
    }

}