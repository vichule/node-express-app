import { RoomInterface } from "../interfaces/Room";
import { ErrorApp } from "../classes/ErrorApp";
import { roomModel } from "../models/RoomModel";
import { connect, disconnect } from "../util/connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";




export const getRooms = async (): Promise<RoomInterface[]> => {
    const conn = await connect()

    const [results, fields] = await conn.execute(`SELECT 
    r.id AS room_id, r.room_type, r.room_number, r.description, r.price,
    r.offer, r.discount, r.cancellation, r.status,
    json_arrayagg(p.photo) AS photo_url,
    json_arrayagg(a.name) AS amenity_name
    FROM rooms r
    LEFT JOIN room_photos rp ON r.id = rp.room_id
    LEFT JOIN photos p ON rp.photo_id = p.id
    LEFT JOIN room_amenities ra ON r.id = ra.room_id
    LEFT JOIN amenities a ON ra.amenities_id = a.id
    GROUP BY r.id;`)
    const rooms = results as RoomInterface[]
    disconnect(conn)
    return rooms
}

export const getRoom = async (id: any): Promise<RowDataPacket> => {
    const conn = await connect()
    const query = `SELECT 
    r.id AS room_id, r.room_type, r.room_number, r.description, 
    r.price, r.offer, r.discount, r.cancellation, r.status,
    json_arrayagg(p.photo) AS photo_url,
    json_arrayagg(a.name) AS amenity_name
    FROM rooms r
    LEFT JOIN room_photos rp ON r.id = rp.room_id
    LEFT JOIN photos p ON rp.photo_id = p.id
    LEFT JOIN room_amenities ra ON r.id = ra.room_id
    LEFT JOIN amenities a ON ra.amenities_id = a.id
    WHERE r.id = ?
    GROUP BY r.id;`
    const prepared = await conn.prepare(query)
    const [results, fields] = await prepared.execute([id])
    const roomData = results as RowDataPacket
    conn.unprepare(query)
    disconnect(conn)
    if (roomData.length === 0) {
        throw new ErrorApp({ status: 404, message: 'Error, room does not exist' })
    } else {
        return roomData
    }

}

export const deleteRoom = async (id: any): Promise<RowDataPacket> => {
    const conn = await connect()
    const query = `DELETE FROM rooms where id = ?`
    const prepared = await conn.prepare(query)
    const [results, fields] = await prepared.execute([id])
    const resultHeaders = results as ResultSetHeader
    const roomData = results as RowDataPacket
    conn.unprepare(query)
    disconnect(conn)
    if (resultHeaders.affectedRows === 0) {
        throw new ErrorApp({ status: 404, message: 'Error, room does not exist' })
    } else {
        return roomData
    }

}

export const addRoom = async (room: RoomInterface): Promise<RowDataPacket> => {
   
    const conn = await connect()
    const query = `INSERT INTO rooms(
        room_type,room_number,
        description,price,offer,discount,cancellation,status)
        VALUES(?,?,?,?,?,?,?,?)`
        const prepared = await conn.prepare(query)
        const [results,fields] = await prepared.execute([
            room.room_type,
            room.room_number,
            room.description,
            room.price,
            room.offer,
            room.discount,
            room.cancellation,
            room.status
        ])
        const resultHeaders = results as ResultSetHeader
        const newRoom = await getRoom(resultHeaders.insertId) as RowDataPacket
        conn.unprepare(query)
        disconnect(conn)

        if (resultHeaders.affectedRows === 0) {
            throw new ErrorApp({ status: 404, message: 'Error, room data not exist' })
        } else {
            return newRoom
        }
}

export const editRoom = async (id: any, room: RoomInterface): Promise<RowDataPacket> => {

    const conn = await connect()
    const query = `UPDATE rooms SET
    room_type = ?, room_number = ?, description = ?,price = ?,
    offer = ?,discount = ?,cancellation = ?,status = ?
    WHERE id = ?`
    const prepared = await conn.prepare(query)
    const [results,fields] = await prepared.execute([
        room.room_type,
        room.room_number,
        room.description,
        room.price,
        room.offer,
        room.discount,
        room.cancellation,
        room.status,
        id
    ])
    const resultHeaders = results as ResultSetHeader
    const newRoom = await getRoom(resultHeaders.insertId) as RowDataPacket
    conn.unprepare(query)
    disconnect(conn)

    if (resultHeaders.affectedRows === 0) {
        throw new ErrorApp({ status: 404, message: 'Error, room data not exist' })
    } else {
        return newRoom
    }
}