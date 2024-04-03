import express, { NextFunction, Request, Response } from 'express'
import { addUser, deleteUser, editUser, getUser, getUsers } from '../services/user'
import { authToken } from '../middleware/auth'

export const userController = express.Router()

userController.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(getUsers(res))
    } catch (error) {
        next(error)
    }
})

userController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(getUser(Number(req.params.id),res))
    } catch (error) {
        next(error)
    }
})

userController.delete('/:id',authToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(deleteUser(Number(req.params.id),res))
    } catch (error) {
        next(error)
    }
})

userController.put('/:id',authToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(editUser(Number(req.params.id), req.body,res))
    } catch (error) {
        next(error)
    }
})

userController.post('/',authToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201)
        res.json(addUser(req.body,res))
    } catch (error) {
        next(error)
    }
})