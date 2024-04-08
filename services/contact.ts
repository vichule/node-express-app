import { readData, writeData } from "../util/dataExtract";
import { ContactInterface } from "../interfaces/Contact";
import { ErrorApp } from "../classes/ErrorApp";



export const getContacts = (): ContactInterface[] => {
    const contactsData = readData('./data/contact.json') as ContactInterface[]
    return contactsData
}

export const getContact = (id: number): ContactInterface | string => {
    const contact = getContacts().find(element => element.id === id)
    if (contact === undefined || contact === null) {
        throw new ErrorApp({status: 404, message: 'Error, booking doesnt exist'})
    } else {
        return contact
    }
}

export const deleteContact = (id: number): string => {
    const contactsData = getContacts()
    const contactID = contactsData.findIndex(element => element.id === id)
    if (contactID === -1) {
        throw new ErrorApp({status: 404, message: 'Error, booking doesnt exist'})
    } else {
        contactsData.splice(contactID, 1)
        writeData('./data/contact.json', JSON.stringify(contactsData))
        return `Contact with id: ${id} has been deleted`
    }

}

export const addContact = (contact: ContactInterface): string => {
    const contactsData = getContacts()
    if (contact === null || contact === undefined) {
        throw new ErrorApp({ status: 400, message: 'Error trying to create new message' })
    }
    contactsData.push(contact)
    writeData('./data/contact.json', JSON.stringify(contactsData))
    return 'contact added successfully'
}

export const editContact = (id: number, contact: ContactInterface): string => {
    const contactsData = getContacts()
    const contactID = contactsData.findIndex(element => element.id === id)
    if (contactID === -1) {
        throw new ErrorApp({status: 404, message: 'Error, booking doesnt exist'})
    } else {
        contactsData.splice(contactID, 1)
        contactsData.push(contact)
        writeData('./data/contact.json', JSON.stringify(contactsData))
        return 'contact edited successfully'
    }
}