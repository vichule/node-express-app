import mongoose, { model } from "mongoose";
import { UserInterface } from "../interfaces/User";


const { Schema } = mongoose

const userSchema = new Schema<UserInterface>({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    start_date: { type: String, required: true},
    job: { type: String, required: true},
    description: { type: String, required: true},
    photo: { type: String, required: true},
    phone: { type: String, required: true},
    status: {type: String,enum: ["Active", "Inactive"], required: true},
    password: {type: String, required: true}
})

export const userModel = model<UserInterface>('users', userSchema)