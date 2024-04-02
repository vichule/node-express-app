import express, { NextFunction, Request, Response } from 'express'
import { addUser, deleteUser, editUser, getUser, getUsers } from '../services/user'

export const userController = express.Router()

userController.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(getUsers())
    } catch (error) {
        next(error)
    }
})

userController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(getUser(Number(req.params.id)))
    } catch (error) {
        next(error)
    }
})

userController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(deleteUser(Number(req.params.id)))
    } catch (error) {
        next(error)
    }
})

userController.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(editUser(Number(req.params.id), req.body))
    } catch (error) {
        next(error)
    }
})

userController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(addUser(req.body))
    } catch (error) {
        next(error)
    }
})