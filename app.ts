import express, { NextFunction, Request, Response } from 'express'
import { bookingController } from './controllers/booking';
import { contactController } from './controllers/contact';
import { roomController } from './controllers/room';
import { userController } from './controllers/user';
import { homeRouter } from './controllers/home';
import { authRouter } from './controllers/login';
import path from 'path';
import { authTokenMiddleware } from './middleware/auth';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGODB_URI!

mongoose.connect(uri).then((x) => {
    console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
})
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });

export const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('specs'))
app.use("/", homeRouter)
app.use("/login", authRouter)

app.use(authTokenMiddleware)

app.use("/bookings", bookingController);
app.use("/contacts", contactController);
app.use("/rooms", roomController);
app.use("/users", userController);


// app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
//     console.error(err)
//     return res.status(500).json({error: true, message: 'Error'})
// })