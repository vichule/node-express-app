import { NextFunction, Request, Response } from 'express'
import jwtoken, { Secret } from 'jsonwebtoken'

import dotenv from 'dotenv'

interface AuthInterface extends Request {
    user?: any
}

dotenv.config()
const PRIVATE_TOKEN: Secret = process.env.TOKEN_SECRET || ''

export const generateAccessToken = (username: string) => {
    return jwtoken.sign({username}, PRIVATE_TOKEN, { expiresIn: '1800d' });
}

export const authToken = (req: AuthInterface, res: Response, next: NextFunction)=> {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwtoken.verify(token, PRIVATE_TOKEN as string, (err: any, user: any) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
}