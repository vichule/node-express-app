import { UserInterface } from "../interfaces/User";
import { ErrorApp } from "../classes/ErrorApp";
import { userModel } from "../models/UserModel";
import bcrypt from 'bcryptjs';
import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { connect, disconnect } from "../util/connection";


export const getUsers = async (): Promise<UserInterface[]> => {
    const conn = await connect()
    
    const [results, fields] = await conn.execute(`SELECT * FROM users`)
    const users = results as UserInterface[]
    disconnect(conn)
    return users


}

export const getUser = async (id: any): Promise<RowDataPacket[]> => {
    const conn = await connect()
    const query = `SELECT * FROM users WHERE id = ?`
    const prepared = await conn.prepare(query)
    const [results, fields] = await prepared.execute([id])
    const userData = results as RowDataPacket[]
    conn.unprepare(query)
    disconnect(conn)
    if (userData.length === 0) {
        throw new ErrorApp({ status: 404, message: 'Error, user does not exist' })
    }

    return userData



}

export const deleteUser = async (id: any): Promise<RowDataPacket> => {
    const conn = await connect()
    const query = `DELETE FROM users where id = ?`
    const prepared = await conn.prepare(query)
    const [results, fields] = await prepared.execute([id])
    const resultHeaders = results as ResultSetHeader
    const userData = results as RowDataPacket
    conn.unprepare(query)
    disconnect(conn)
    if (resultHeaders.affectedRows === 0) {
        throw new ErrorApp({ status: 404, message: 'Error, user does not exist' })
    } else {
        return userData
    }


}

export const addUser = async (user: UserInterface): Promise<RowDataPacket> => {
    const conn = await connect()
    const hashedPassword = bcrypt.hashSync(user.password, 5)
    const query = `INSERT INTO users(first_name, last_name, email, start_date,job,
        description, photo, status, phone, password) VALUES(?,?,?,?,?,?,?,?,?,?)`
    const prepared = await conn.prepare(query)
    const [results, fields] = await prepared.execute([
        user.first_name,
        user.last_name,
        user.email,
        new Date(user.start_date).toISOString().slice(0, 10),
        user.job,
        user.description,
        user.photo,
        user.status,
        user.phone,
        hashedPassword
    ])
    const resultHeaders = results as ResultSetHeader
    const newUser = await getUser(resultHeaders.insertId) as RowDataPacket
    conn.unprepare(query)
    disconnect(conn)
    
    if (resultHeaders.affectedRows === 0) {
        throw new ErrorApp({ status: 404, message: 'Error, user data not exist' })
    } else {
        return newUser
    }
}

export const editUser = async (id: any, user: UserInterface): Promise<UserInterface | null> => {
    const userToEdit = await userModel.findById(id)
    if (userToEdit === null) {
        throw new ErrorApp({ status: 404, message: 'Error, user does not exist' })
    }

    if (!bcrypt.compareSync(user.password, userToEdit.password) && user.password !== '') {

        const newPassword = bcrypt.hashSync(user.password, 5)
        return (await userModel.findByIdAndUpdate(id, { ...user, password: newPassword }, { new: true }))

    } else {
        return (await userModel.findByIdAndUpdate(id, { ...user, password: userToEdit.password }, { new: true }))
    }


}