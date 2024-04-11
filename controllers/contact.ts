import express, { NextFunction, Request, Response } from 'express'
import { addContact, deleteContact, editContact, getContact, getContacts } from '../services/contact'
import { ErrorApp } from '../classes/ErrorApp'

export const contactController = express.Router()

contactController.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const dataContacts = await getContacts()
        res.json(dataContacts)
    } catch (error: any) {
        next(error)
    }
})

contactController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataContacts = await getContact(req.params.id)
        if (dataContacts === undefined || dataContacts === null) {
            throw new ErrorApp({status: 404, message: 'Error, booking doesnt exist'})

        } else {
            res.json(dataContacts)
        }
        
        
    } catch (error: any) {
        next(error)
    }
})

contactController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataContact = await deleteContact((req.params.id))
        if (dataContact == null) {
            throw new ErrorApp({status: 404, message: 'Error, booking doesnt exist'})
        } else {
            res.json(`Contact with id: ${req.params.id} has been deleted`)
        }
        
        
    } catch (error: any) {
        next(error)
    }
})

contactController.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataContact = await editContact((req.params.id), req.body)
        if (dataContact == null) {
            throw new ErrorApp({status: 404, message: 'Error, booking doesnt exist'})
        } else {
            res.json(dataContact)
        }
        
        
    } catch (error: any) {
        next(error)
    }
})

contactController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataContact = await editContact((req.params.id), req.body)
        if (dataContact === null || dataContact === undefined) {
            throw new ErrorApp({ status: 400, message: 'Error trying to create new message' })
        }
        res.json(dataContact)
        
    } catch (error: any) {
        next(error)
    }
})