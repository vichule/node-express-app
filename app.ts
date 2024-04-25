import express, { NextFunction, Request, Response } from 'express'
import { bookingController } from './controllers/booking';
import { contactController } from './controllers/contact';
import { roomController } from './controllers/room';
import { userController } from './controllers/user';
import { homeRouter } from './controllers/home';
import { authRouter } from './controllers/login';
import { authTokenMiddleware } from './middleware/auth';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ErrorApp } from './classes/ErrorApp';
import cors from 'cors';
import { connect } from './util/connection';

const corsOrigin = ["http://localhost:5173","http://dashboard-miranda-v.s3-website.eu-west-3.amazonaws.com"]

dotenv.config();
// const uri = process.env.MONGODB_URI!

// mongoose.connect(uri).then((x) => {
//     console.log(
//         `Connected to Mongo! Database name: "${x.connections[0].name}"`
//     );
// })
//     .catch((err) => {
//         console.error("Error connecting to mongo: ", err);
//     });

try {
    connect()
} catch (error) {
    console.log(error)
}


export const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('specs'))

app.options('*', cors())
app.use(cors({"origin": corsOrigin}))

app.use("/", homeRouter)
app.use("/login", authRouter)

app.use(authTokenMiddleware)

app.use("/bookings", bookingController);
app.use("/contacts", contactController);
app.use("/rooms", roomController);
app.use("/users", userController);


app.use((err: ErrorApp, _req: Request, res: Response, _next: NextFunction) => {
   return res.json({status: err.status || 500, message: err.status ? err.message : 'Internal server error'})
})
