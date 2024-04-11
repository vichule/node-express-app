import express, { NextFunction, Request, Response } from 'express'
import { addUser, deleteUser, editUser, getUser, getUsers } from '../services/user'
import { ErrorApp } from '../classes/ErrorApp'

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
        if (dataUser === undefined || dataUser === null) {
            throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
        } else {
            res.json(dataUser)
        }


    } catch (error) {
        next(error)
    }
})

userController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataUser = await deleteUser((req.params.id))
        if (dataUser == null) {
            throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
        } else {
            res.json(`user with id: ${req.params.id} has been deleted`)
        }

    } catch (error: any) {
        next(error)
    }
})

userController.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataUser = await editUser((req.params.id), req.body)
        if (dataUser == null) {
            throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
        } else {
            res.json(dataUser)
        }
        
        
    } catch (error: any) {
        next(error)
    }
})

userController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataUser = await addUser(req.body)
        if (dataUser === null || dataUser === undefined) {
            throw new ErrorApp({ status: 400, message: 'Error trying to create new user' })
        }
        res.json(dataUser)

    } catch (error: any) {
        next(error)
    }
})