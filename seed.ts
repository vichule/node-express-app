
import { faker } from '@faker-js/faker';
import { userModel } from './models/UserModel';
import { bookingModel } from './models/BookingModel';
import { roomModel } from './models/RoomModel';
import { contactModel } from './models/ContactModel';
import { MongoClient } from "mongodb";
import { RoomInterface } from './interfaces/Room';
import { ContactInterface } from './interfaces/Contact';
import { UserInterface } from './interfaces/User';
import { BookingInterface } from './interfaces/Booking';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { connect, disconnect } from './util/connection';
import { createTableQuery, deleteTableQuery, insertAmenitiesQuery, insertContactQuery, insertPhotosQuery, insertUserQuery } from './util/databaseQuery';
import mysql from 'mysql2/promise'
import { exit } from 'process';
import { amenitiesQuery, bookingsQuery, contactsQuery, photosQuery, roomAmenitiesQuery, roomPicsQuery, roomsQuery, usersQuery } from './util/dataQueries';

dotenv.config();

const uri = process.env.MONGODB_URI!
const client = new MongoClient(uri);


const createRoom = (): RoomInterface => {
    return new roomModel({
        _id: faker.string.uuid(),
        room_type: faker.helpers.arrayElement(['Suite', 'Single Bed', 'Double Bed', 'Double Superior']),
        room_number: faker.number.int({ min: 10, max: 500 }),
        description: faker.lorem.sentence({ min: 3, max: 10 }),
        price: faker.number.int({ min: 150, max: 500 }),
        offer: faker.datatype.boolean(0.5),
        discount: faker.number.int({ min: 0, max: 99 }),
        cancellation: faker.lorem.text(),
        photos: [
            faker.image.urlLoremFlickr({ category: 'hotel,bedroom' }),
            faker.image.urlLoremFlickr({ category: 'hotel,bedroom' }),
            faker.image.urlLoremFlickr({ category: 'hotel,bedroom' })
        ],
        amenities: faker.helpers.arrayElements([
            "Air conditioner",
            "Breakfast",
            "Cleaning",
            "Grocery",
            "Shop near",
            "24/7 Online Support",
            "Smart Security",
            "High-speed WiFi",
            "Kitchen",
            "Shower",
            "Towels",
            "Strong Locker",
            "Expert Team"
        ], { min: 5, max: 13 }),
        status: faker.helpers.arrayElement(['Available', 'Booked'])
    })
}

export const ROOMS: RoomInterface[] = faker.helpers.multiple(createRoom, {
    count: 15,
});

const createContact = (): ContactInterface => {

    return new contactModel({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        subject: faker.lorem.sentence({ min: 1, max: 5 }),
        message: faker.lorem.text(),
        date: faker.date.recent().toISOString().slice(0, 10),
        photo: faker.image.urlLoremFlickr({ category: 'people' }),
        status: faker.datatype.boolean(0.5)
    })
}

export const CONTACTS: ContactInterface[] = faker.helpers.multiple(createContact, {
    count: 15,
});

const createUser = () => {
    const rawPassword = faker.string.alphanumeric(10)
    const userEmail = faker.internet.email()
    //console.log(`user: ${userEmail} with password: ${rawPassword}`)
    const hashPassword = bcrypt.hashSync(rawPassword, 5)

    return new userModel({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: userEmail,
        start_date: faker.date.past().toISOString().slice(0, 10),
        job: faker.helpers.arrayElement(['Room Service', 'Recepcionist', 'Manager']),
        description: faker.lorem.sentence({ min: 1, max: 5 }),
        photo: faker.image.urlLoremFlickr({ category: 'people' }),
        phone: faker.phone.number(),
        status: faker.helpers.arrayElement(['Active', 'Inactive']),
        password: hashPassword
    })
}

export const USERS: UserInterface[] = faker.helpers.multiple(createUser, {
    count: 15,
});

const createBooking = (ROOMS: RoomInterface[]) => {

    const randomId = (rooms: RoomInterface[]) => {
        const randNum = Math.floor(Math.random() * rooms.length)
        return rooms[randNum]._id
    }

    return new bookingModel({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        order_date: faker.date.recent().toISOString().slice(0, 10),
        check_in: faker.date.recent().toISOString().slice(0, 10),
        check_out: faker.date.soon().toISOString().slice(0, 10),
        notes: faker.lorem.sentence({ min: 1, max: 5 }),
        room: randomId(ROOMS),
        status: faker.helpers.arrayElement(['Check-in', 'Check-out', 'In progress', 'Cancelled']),
        discount: faker.number.int({ min: 0, max: 99 })
    })
}

export const BOOKINGS: BookingInterface[] = faker.helpers.multiple(() => createBooking(ROOMS), {
    count: 15,
});

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
    insertAmenitiesQuery(conn)
    insertPhotosQuery(conn)
    insertUserQuery(conn)
    insertContactQuery(conn)
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