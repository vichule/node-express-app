import express, { NextFunction, Request, Response } from 'express'
import { addContact, deleteContact, editContact, getContact, getContacts } from '../services/contact'

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
        res.json(dataContacts)
    } catch (error: any) {
        next(error)
    }
})

contactController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataContact = await deleteContact((req.params.id))
        res.json(dataContact)
    } catch (error: any) {
        next(error)
    }
})

contactController.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataContact = await editContact((req.params.id), req.body)
        res.json(dataContact)
    } catch (error: any) {
        next(error)
    }
})

contactController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataContact = await addContact(req.body)
        res.json(dataContact)
    } catch (error: any) {
        next(error)
    }
})