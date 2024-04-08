import express, { NextFunction, Request, Response } from 'express'
import { addUser, deleteUser, editUser, getUser, getUsers } from '../services/user'

export const userController = express.Router()

userController.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const dataUsers = await getUsers()
        res.json(dataUsers)
    } catch (error) {
        next(error)
    }
})

userController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataUser = await getUser(req.params.id)
        res.json(dataUser)
    } catch (error) {
        next(error)
    }
})

userController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        res.json(deleteUser((req.params.id)))
    } catch (error: any) {
        next(error)
    }
})

userController.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        res.json(editUser((req.params.id), req.body))
    } catch (error: any) {
        next(error)
    }
})

userController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        res.json(addUser(req.body))
    } catch (error: any) {
        next(error)
    }
})