import express, { NextFunction, Request, Response } from 'express'
import { bookingController } from './controllers/booking';
import { contactController } from './controllers/contact';
import { roomController } from './controllers/room';
import { userController } from './controllers/user';
import { homeRouter } from './controllers/home';
import { authRouter } from './controllers/login';

export const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/bookings", bookingController);
app.use("/contacts", contactController);
app.use("/rooms", roomController);
app.use("/users", userController);
app.use("/", homeRouter)
app.use("/login", authRouter)

// app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
//     console.error(err)
//     return res.status(500).json({error: true, message: 'Error'})
// })