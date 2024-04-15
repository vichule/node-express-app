import { NextFunction, Request, Response } from 'express'
import jwtoken, { Secret } from 'jsonwebtoken'

import dotenv from 'dotenv'

interface AuthInterface extends Request {
    user?: any
}

dotenv.config()
const PRIVATE_TOKEN: Secret = process.env.TOKEN_SECRET || ''



export const authTokenMiddleware = (req: AuthInterface, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401)
        .json('Error, no authorized')

    jwtoken.verify(token, PRIVATE_TOKEN as string, (err: any, user: any) => {

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}