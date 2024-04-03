import { readData, writeData } from "../util/dataExtract";
import { ContactInterface } from "../interfaces/Contact";
import { Response } from "express";

const contactsData = readData('./data/contact.json') as ContactInterface[]

export const getContacts = (res: Response): ContactInterface[] | string => {
    if (contactsData === undefined || contactsData.length === 0) {
        res.status(404)
        return 'Error, there is no data'
    } else {
        return contactsData
    }

}

export const getContact = (id: number, res: Response): ContactInterface | string => {
    const contact = contactsData.find(element => element.id === id)
    if (contact === undefined || contact === null) {
        res.status(404)
        return 'Error, contact doesnt exist'
    } else {
        return contact
    }
}

export const deleteContact = (id: number, res: Response): string => {
    const contactID = contactsData.findIndex(element => element.id === id)
    if (contactID === -1) {
        res.status(404)
        return 'Error, the contact doesnt exist'
    } else {
        contactsData.splice(contactID, 1)
        writeData('./data/contact.json', JSON.stringify(contactsData))
        return `Contact with id: ${id} has been deleted`
    }

}

export const addContact = (contact: ContactInterface, res: Response): string => {
    if (contact === null || contact === undefined) {
        res.status(400)
        return 'Error trying to create new contact'
    }
    contactsData.push(contact)
    writeData('./data/contact.json', JSON.stringify(contactsData))
    return 'contact added successfully'
}

export const editContact = (id: number, contact: ContactInterface, res: Response): string => {
    const contactID = contactsData.findIndex(element => element.id === id)
    if (contactID === -1) {
        res.status(404)
        return 'Error, the contact doesnt exist'
    } else {
        contactsData.splice(contactID, 1)
        contactsData.push(contact)
        writeData('./data/contact.json', JSON.stringify(contactsData))
        return 'contact edited successfully'
    }
}