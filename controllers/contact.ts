import express, { NextFunction, Request, Response } from 'express'
import { addContact, deleteContact, editContact, getContact, getContacts } from '../services/contact'
import { authToken } from '../middleware/auth'

export const contactController = express.Router()

contactController.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(getContacts(res))
    } catch (error) {
        next(error)
    }
})

contactController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(getContact(Number(req.params.id),res))
    } catch (error) {
        next(error)
    }
})

contactController.delete('/:id',authToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(deleteContact(Number(req.params.id),res))
    } catch (error) {
        next(error)
    }
})

contactController.put('/:id',authToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(editContact(Number(req.params.id), req.body,res))
    } catch (error) {
        next(error)
    }
})

contactController.post('/',authToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(addContact(req.body,res))
    } catch (error) {
        next(error)
    }
})