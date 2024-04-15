import { ContactInterface } from "../interfaces/Contact";
import { ErrorApp } from "../classes/ErrorApp";
import mongoose from "mongoose";
import { contactModel } from "../models/ContactModel";



export const getContacts = async (): Promise<ContactInterface[]> => {
    return (await contactModel.find({}))
}

export const getContact = async (id: any): Promise<ContactInterface | null> => {
    const contactData = (await contactModel.findById(id))
    if(contactData === null){
        throw new ErrorApp({status: 404, message: 'Error, contact does not exist'})

    } else{
        return contactData
    }
}

export const deleteContact = async (id: any): Promise<ContactInterface | null> => {
    const contactData = (await contactModel.findByIdAndDelete(id))
    if(contactData === null){
        throw new ErrorApp({status: 404, message: 'Error, contact does not exist'})

    } else{
        return contactData
    }
    

}

export const addContact = async (contact: ContactInterface): Promise<ContactInterface | null> => {
    const contactData = (await contactModel.create(contact))
    if(contactData === null){
        throw new ErrorApp({status: 404, message: 'Error, contact does not exist'})

    } else{
        return contactData
    }
}

export const editContact = async (id: any, contact: ContactInterface): Promise<ContactInterface | null> => {
    const contactData = (await contactModel.findByIdAndUpdate(id, contact, {new:true}))
    if(contactData === null){
        throw new ErrorApp({status: 404, message: 'Error, contact does not exist'})

    } else{
        return contactData
    }   
}