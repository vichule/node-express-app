import { readData, writeData } from "../util/dataExtract";
import { ContactInterface } from "../interfaces/Contact";
import { ErrorApp } from "../classes/ErrorApp";
import mongoose from "mongoose";
import { contactModel } from "../schemas/ContactSchema";



export const getContacts = async (): Promise<ContactInterface[]> => {
    const contactsData = await contactModel.find({})
    return contactsData
}

export const getContact = async (id: any): Promise<ContactInterface | string> => {
    const contact = await contactModel.findById(id)
    if (contact === undefined || contact === null) {
        throw new ErrorApp({status: 404, message: 'Error, booking doesnt exist'})
    } else {
        return contact
    }
}

export const deleteContact = async (id: any): Promise<string> => {
    const contactID = await contactModel.findByIdAndDelete(id)
    if (!contactID) {
        throw new ErrorApp({status: 404, message: 'Error, booking doesnt exist'})
    } else {
        return `Contact with id: ${id} has been deleted`
    }

}

export const addContact = async (contact: ContactInterface): Promise<ContactInterface> => {
    if (contact === null || contact === undefined) {
        throw new ErrorApp({ status: 400, message: 'Error trying to create new message' })
    }
    const contactID = await contactModel.create(contact)
    return contactID
}

export const editContact = async (id: any, contact: ContactInterface): Promise<ContactInterface> => {
    const contactID = await contactModel.findByIdAndUpdate(id, contact, {new:true})
    if (!contactID) {
        throw new ErrorApp({status: 404, message: 'Error, booking doesnt exist'})
    } else {
        
        return contactID
    }
}