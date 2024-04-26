import { BookingInterface } from "../interfaces/Booking";
import { ErrorApp } from "../classes/ErrorApp";
import { bookingModel } from "../models/BookingModel";
import { connect, disconnect } from "../util/connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";






export const getBookings = async (): Promise<BookingInterface[]> => {
    const conn = await connect()

    const [results, fields] = await conn.execute(`SELECT 
    b.id AS booking_id, b.first_name, b.last_name, b.order_date, 
    b.check_in, b.check_out, b.notes, b.status AS booking_status,
    b.discount AS booking_discount, r.id AS room_id, r.room_type, 
    r.room_number, r.description AS room_description, r.price AS room_price, r.offer, r.discount AS room_discount, r.cancellation, r.status AS room_status
    FROM bookings b
    JOIN rooms r ON b.room_id = r.id;`)
    const bookings = results as BookingInterface[]
    disconnect(conn)
    return bookings

}

export const getBooking = async (id: any): Promise<RowDataPacket> => {

    const conn = await connect()
    const query = `SELECT 
    b.id AS booking_id, b.first_name, b.last_name, b.order_date, 
    b.check_in, b.check_out, b.notes, b.status AS booking_status,
    b.discount AS booking_discount, r.id AS room_id, r.room_type, 
    r.room_number, r.description AS room_description, r.price AS room_price, r.offer, r.discount AS room_discount, r.cancellation, r.status AS room_status
    FROM bookings b
    JOIN rooms r ON b.room_id = r.id
    WHERE r.id = ?;`
    const prepared = await conn.prepare(query)
    const [results, fields] = await prepared.execute([id])
    const bookingsData = results as RowDataPacket
    conn.unprepare(query)
    disconnect(conn)
    if (bookingsData.length === 0) {
        throw new ErrorApp({ status: 404, message: 'Error, booking does not exist' })
    } else {
        return bookingsData
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

export const addBooking = async (booking: BookingInterface): Promise<RowDataPacket> => {
    const conn = await connect()
    const query = `INSERT INTO bookings(
        first_name,last_name,
        order_date,check_in,check_out,notes,status,discount,room_id)
        VALUES(?,?,?,?,?,?,?,?,?)`
        const prepared = await conn.prepare(query)
        console.log(booking)
        const [results,fields] = await prepared.execute([
            booking.first_name,
            booking.last_name,
            new Date(booking.order_date).toISOString().slice(0, 10),
            new Date(booking.check_in).toISOString().slice(0, 10),
            new Date(booking.check_out).toISOString().slice(0, 10),
            booking.notes,
            booking.status,
            booking.discount,
            booking.room
        ])
        const resultHeaders = results as ResultSetHeader
        const newBooking = await getBooking(resultHeaders.insertId) as RowDataPacket
        
        conn.unprepare(query)
        disconnect(conn)

        if (resultHeaders.affectedRows === 0) {
            throw new ErrorApp({ status: 404, message: 'Error, booking data not exist' })
        } else {
            return newBooking
        }

}

export const editBooking = async (id: any, booking: BookingInterface): Promise<BookingInterface | null> => {
    const bookingData = (await bookingModel.findByIdAndUpdate(id, booking, { new: true }).populate('room'))

    if (bookingData === null) {
        throw new ErrorApp({ status: 404, message: 'Error, booking does not exist' })
    } else {
        return bookingData
    }

}