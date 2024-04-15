import mongoose, { model } from "mongoose";
import { BookingInterface } from "../interfaces/Booking";
const { Schema } = mongoose

const bookingSchema = new Schema<BookingInterface>({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    order_date: { type: String, required: true},
    check_in: { type: String, required: true},
    check_out: { type: String, required: true},
    room: { type: Schema.Types.ObjectId, ref: 'rooms' },
    notes: { type: String, required: false},
    status: { type: String, required: true},
})

export const bookingModel = model<BookingInterface>('bookings', bookingSchema)