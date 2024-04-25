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

export const addUser = async (user: UserInterface): Promise<UserInterface> => {
    const hashedPassword = bcrypt.hashSync(user.password, 5)
    const userData = (await userModel.create({ ...user, password: hashedPassword }))
    if (userData == null) {
        throw new ErrorApp({ status: 404, message: 'Error, user does not exist' })
    } else {
        return userData
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