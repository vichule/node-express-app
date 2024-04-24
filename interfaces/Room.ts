import { Types } from "mongoose";

export interface RoomInterface {
    id: number,
    room_type: string,
    room_number: number,
    description: string,
    price: number,
    offer: boolean,
    discount: number,
    cancellation: string,
    photos: string[],
    amenities: string[],
    status: string
}