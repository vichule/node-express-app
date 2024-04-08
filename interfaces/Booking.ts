import { Types } from "mongoose";

export interface BookingInterface {
    first_name: string,
    last_name: string,
    order_date: string,
    check_in: string,
    check_out: string,
    notes: string,
    room: Types.ObjectId,
    status: string, 
    room_type: string
}