import express, { NextFunction, Request, Response } from 'express'
import { addContact, deleteContact, editContact, getContact, getContacts } from '../services/contact'

export const contactController = express.Router()

contactController.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(getContacts())
    } catch (error) {
        next(error)
    }
})

contactController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(getContact(Number(req.params.id)))
    } catch (error) {
        next(error)
    }
})

contactController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(deleteContact(Number(req.params.id)))
    } catch (error) {
        next(error)
    }
})

contactController.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(editContact(Number(req.params.id), req.body))
    } catch (error) {
        next(error)
    }
})

contactController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(addContact(req.body))
    } catch (error) {
        next(error)
    }
})