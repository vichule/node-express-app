import { NextFunction, Request, Response } from 'express'
import jwtoken, { Secret } from 'jsonwebtoken'

import dotenv from 'dotenv'
import { ErrorApp } from '../classes/ErrorApp'

interface AuthInterface extends Request {
    user?: any
}

dotenv.config()
const PRIVATE_TOKEN: Secret = process.env.TOKEN_SECRET || ''

export const generateAccessToken = (username: string) => {
    return jwtoken.sign({ username }, PRIVATE_TOKEN, { expiresIn: '1800d' });
}

export const authTokenMiddleware = (req: AuthInterface, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401)
        .json('Error, no authorized')





    jwtoken.verify(token, PRIVATE_TOKEN as string, (err: any, user: any) => {
        //console.log(err, 'error token', token)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}