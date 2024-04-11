import { ContactInterface } from "../interfaces/Contact";
import { ErrorApp } from "../classes/ErrorApp";
import mongoose from "mongoose";
import { contactModel } from "../schemas/ContactSchema";



export const getContacts = async (): Promise<ContactInterface[]> => {
    const contactsData = await contactModel.find({})
    return contactsData
}

export const getContact = async (id: any): Promise<ContactInterface | null> => {
    try {
        return (await contactModel.findById(id))
    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })

    }    
}

export const deleteContact = async (id: any): Promise<ContactInterface | null> => {
    try {
        return (await contactModel.findByIdAndDelete(id))
    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })

    }
    

}

export const addContact = async (contact: ContactInterface): Promise<ContactInterface | null> => {
    try {
        return (await contactModel.create(contact))
    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })

    }
}

export const editContact = async (id: any, contact: ContactInterface): Promise<ContactInterface | null> => {
    try {
        return (await contactModel.findByIdAndUpdate(id, contact, {new:true}))
    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })

    }    
}