import { ContactInterface } from "../interfaces/Contact";
import { ErrorApp } from "../classes/ErrorApp";
import mongoose from "mongoose";
import { contactModel } from "../models/ContactModel";
import { connect, disconnect } from "../util/connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";



export const getContacts = async (): Promise<ContactInterface[]> => {
    const conn = await connect()
    
    const [results, fields] = await conn.execute(`SELECT * FROM contacts`)
    const users = results as ContactInterface[]
    disconnect(conn)
    return users
}

export const getContact = async (id: any): Promise<RowDataPacket[]> => {
    const conn = await connect()
    const query = `SELECT * FROM contacts WHERE id = ?`
    const prepared = await conn.prepare(query)
    const [results, fields] = await prepared.execute([id])
    const contactData = results as RowDataPacket[]
    conn.unprepare(query)
    disconnect(conn)
    if (contactData.length === 0) {
        throw new ErrorApp({ status: 404, message: 'Error, contact does not exist' })
    }

    return contactData
}

export const deleteContact = async (id: any): Promise<RowDataPacket> => {
    const conn = await connect()
    const query = `DELETE FROM contacts where id = ?`
    const prepared = await conn.prepare(query)
    const [results, fields] = await prepared.execute([id])
    const resultHeaders = results as ResultSetHeader
    const contactData = results as RowDataPacket
    conn.unprepare(query)
    disconnect(conn)
    if (resultHeaders.affectedRows === 0) {
        throw new ErrorApp({ status: 404, message: 'Error, contact does not exist' })
    } else {
        return contactData
    }
    

}

export const addContact = async (contact: ContactInterface): Promise<RowDataPacket> => {
    const conn = await connect()
    const query = `INSERT INTO contacts(first_name, last_name, email,phone,subject,message,date,photo,status) 
    VALUES(?,?,?,?,?,?,?,?,?)`
    const prepared = await conn.prepare(query)
    const [results, fields] = await prepared.execute([
        contact.first_name,
        contact.last_name,
        contact.email,
        contact.phone,
        contact.subject,
        contact.message,
        new Date(contact.date).toISOString().slice(0, 10),
        contact.photo,
        contact.status,
        
    ])
    const resultHeaders = results as ResultSetHeader
    const newContact = await getContact(resultHeaders.insertId) as RowDataPacket
    conn.unprepare(query)
    disconnect(conn)
    
    if (resultHeaders.affectedRows === 0) {
        throw new ErrorApp({ status: 404, message: 'Error, contact data not exist' })
    } else {
        return newContact
    }
}

export const editContact = async (id: any, contact: ContactInterface): Promise<RowDataPacket> => { 

    const conn = await connect()
    const query = `UPDATE contacts SET
    first_name = ?, last_name = ?, email = ?,phone = ?,
    subject = ?,message = ?,date = ?,photo = ?,status = ?
    WHERE id = ?`
    const prepared = await conn.prepare(query)
    const [results, fields] = await prepared.execute([
        contact.first_name,
        contact.last_name,
        contact.email,
        contact.phone,
        contact.subject,
        contact.message,
        new Date(contact.date).toISOString().slice(0, 10),
        contact.photo,
        contact.status,
        id
        
    ])
    const resultHeaders = results as ResultSetHeader
    const contactData = results as RowDataPacket
    const newContact = await getContact(resultHeaders.insertId) as RowDataPacket
    conn.unprepare(query)
    disconnect(conn)
    
    if (contactData.length === 0) {
        throw new ErrorApp({ status: 404, message: 'Error, contact doest not exist' })
    } else {
        return newContact
    }
}