import express, { NextFunction, Request, Response } from 'express'
import { userModel } from '../models/UserModel'
import bcrypt from 'bcryptjs';
import { ErrorApp } from '../classes/ErrorApp';
import { generateAccessToken } from '../util/generateToken';

export const authRouter = express.Router()

authRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body
        const user = await userModel.findOne({ email: username })

        if (user === null) {
            throw new ErrorApp({ status: 404, message: "User not found" })
        } else if (!bcrypt.compareSync(password, user.password)) {
            throw new ErrorApp({ status: 403, message: "Wrong password" })
        }
        const token = generateAccessToken(user.email)
        return res.json({token: token, email: user.email, name: user.first_name})

    } catch (err: any) {
        next(err)

    }

})