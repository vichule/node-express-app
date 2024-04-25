import { Types } from "mongoose";
import { RoomInterface } from "./Room";

export interface BookingInterface {
    first_name: string,
    last_name: string,
    order_date: string,
    check_in: string,
    check_out: string,
    notes: string,
    room: RoomInterface,
    status: string, 
    discount: number
}