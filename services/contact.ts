import { readData, writeData } from "../util/dataExtract";
import { ContactInterface } from "../interfaces/Contact";

const contactsData = readData('./data/contact.json') as ContactInterface[]

export const getContacts = (): ContactInterface[] | string => {
    if (contactsData === undefined || contactsData.length === 0) {
        return 'Error, there is no data'
    } else {
        return contactsData
    }

}

export const getContact = (id: number): ContactInterface | string => {
    const contact = contactsData.find(element => element.id === id)
    if (contact === undefined || contact === null) {
        return 'Error, contact doesnt exist'
    } else {
        return contact
    }
}

export const deleteContact = (id: number): string => {
    const contactID = contactsData.findIndex(element => element.id === id)
    if (contactID === -1) {
        return 'Error, the contact doesnt exist'
    } else {
        contactsData.splice(contactID, 1)
        writeData('./data/contact.json', JSON.stringify(contactsData))
        return `Contact with id: ${id} has been deleted`
    }

}

export const addContact = (contact: ContactInterface): string => {
    if (contact === null || contact === undefined) {
        return 'Error trying to create new contact'
    }
    contactsData.push(contact)
    writeData('./data/contact.json', JSON.stringify(contactsData))
    return 'contact added successfully'
}

export const editContact = (id: number, contact: ContactInterface): string => {
    const contactID = contactsData.findIndex(element => element.id === id)
    if (contactID === -1) {
        return 'Error, the contact doesnt exist'
    } else {
        contactsData.splice(contactID, 1)
        contactsData.push(contact)
        writeData('./data/contact.json', JSON.stringify(contactsData))
        return 'contact edited successfully'
    }
}