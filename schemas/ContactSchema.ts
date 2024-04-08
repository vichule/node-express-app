import mongoose, { model } from "mongoose";
import { ContactInterface } from "../interfaces/Contact";

const { Schema } = mongoose

const contactSchema = new Schema<ContactInterface>({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String, required: true},
    phone: { type: String, required: true},
    subject: { type: String, required: true},
    message: { type: String, required: true},
    date: { type: String, required: true},
    photo: { type: String, required: true},
    status: { type: Boolean, required: true},
})

export const contactModel = model<ContactInterface>('contacts', contactSchema)