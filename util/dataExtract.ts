import fs from 'fs';

import { BookingInterface } from '../interfaces/Booking';
import { ContactInterface } from '../interfaces/Contact';
import { RoomInterface } from '../interfaces/Room';
import { UserInterface } from '../interfaces/User';


export const readData = (json: string): BookingInterface[] | ContactInterface[] | RoomInterface[] | UserInterface[] => {
    const data = fs.readFileSync(json).toString();
    const jsonData = JSON.parse(data);
    return jsonData;
}

export const writeData = (json: string, data: string): void => {
    fs.writeFileSync(json, data);
}