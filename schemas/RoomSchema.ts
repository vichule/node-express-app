import mongoose, { model } from "mongoose";
import { RoomInterface } from "../interfaces/Room";


const { Schema } = mongoose

const roomSchema = new Schema<RoomInterface>({
    id: { type: Number, required: true},
    room_type: { type: String, required: true},
    room_number: { type: Number, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    offer: { type: Boolean, required: true},
    discount: { type: Number, required: true},
    cancellation: { type: String, required: true},
    photos: { type: [String], required: true},
    amenities: { type: [String], required: true},
    status: { type: String, required: true}
})

export const roomModel = model<RoomInterface>('rooms', roomSchema)