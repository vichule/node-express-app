
import dotenv from 'dotenv';
import { connect, disconnect } from './util/connection';
import { createTableQuery, deleteTableQuery, insertAmenitiesQuery, insertBookingQuery, insertContactQuery, insertPhotosQuery, insertRoomAmenities, insertRoomPhotos, insertRoomQuery, insertUserQuery } from './util/databaseQuery';
import mysql from 'mysql2/promise'
import { exit } from 'process';
import { amenitiesQuery, bookingsQuery, contactsQuery, photosQuery, roomAmenitiesQuery, roomPicsQuery, roomsQuery, usersQuery } from './util/dataQueries';

dotenv.config();


const dropTables = async (conn: mysql.PoolConnection) => {
    deleteTableQuery(conn, 'room_amenities')
    deleteTableQuery(conn, 'room_photos')
    deleteTableQuery(conn, 'bookings')
    deleteTableQuery(conn, 'amenities')
    deleteTableQuery(conn, 'photos')
    deleteTableQuery(conn, 'rooms')
    deleteTableQuery(conn, 'users')
    deleteTableQuery(conn, 'contacts')
    await conn.commit()
}

const createTables = async (conn: mysql.PoolConnection) => {
    createTableQuery(conn, amenitiesQuery)
    createTableQuery(conn, photosQuery)
    createTableQuery(conn, roomsQuery)
    createTableQuery(conn, roomPicsQuery)
    createTableQuery(conn, roomAmenitiesQuery)
    createTableQuery(conn, usersQuery)
    createTableQuery(conn, contactsQuery)
    createTableQuery(conn, bookingsQuery)
    await conn.commit()
}

const insertTablesData = async (conn: mysql.PoolConnection) =>{
    //insertDataQuery(conn, 'amenities', 'name', 'Air conditioner')
    await insertAmenitiesQuery(conn)
    await insertPhotosQuery(conn)
    await insertUserQuery(conn)
    await insertContactQuery(conn)
    await insertRoomQuery(conn)
    await insertBookingQuery(conn)
    await insertRoomAmenities(conn)
    await insertRoomPhotos(conn)
    await conn.commit()
}

const connection = async () => {
    

    const conn = await connect()
    try {
       await dropTables(conn)
       await createTables(conn)
       await insertTablesData(conn)
        disconnect(conn)
        exit(1)

    } catch (error) {
        disconnect(conn)
        console.log(error)

    }
}


connection()