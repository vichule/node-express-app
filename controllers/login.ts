import express, { NextFunction, Request, Response } from 'express'
import { generateAccessToken } from '../middleware/auth'
import { userModel } from '../schemas/UserSchema'
import bcrypt from 'bcryptjs';
import { ErrorApp } from '../classes/ErrorApp';

export const authRouter = express.Router()

authRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body
        const user = await userModel.findOne({ email: username })

        if (user === null) {
            throw new ErrorApp({ status: 404, message: "User not found" })
        } else if (!bcrypt.compareSync(password, user.password)) {
            throw new ErrorApp({ status: 500, message: "Wrong password" })
        }
        const token = generateAccessToken(user.email)
        return res.json(token)

    } catch (err: any) {
        next(err)

    }

})