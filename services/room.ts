import { readData, writeData } from "../util/dataExtract";
import { RoomInterface } from "../interfaces/Room";
import { ErrorApp } from "../classes/ErrorApp";
import mongoose from "mongoose";
import { roomModel } from "../schemas/RoomSchema";




export const getRooms = async (): Promise<RoomInterface[]> => {
    const roomsData = await roomModel.find({})
    return roomsData
}

export const getRoom = async (id: number): Promise<string | RoomInterface> => {
    const room = await roomModel.findById(id)
    if (room === undefined || room === null) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {
        return room
    }
}

export const deleteRoom = async (id: number): Promise<string> => {
    const roomID = await roomModel.findByIdAndDelete(id)
    if (!roomID) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {

        return `room with id: ${id} has been deleted`
    }

}

export const addRoom = async (room: RoomInterface): Promise<RoomInterface> => {
    if (room == null || room == undefined) {
        throw new ErrorApp({ status: 400, message: 'Error trying to create new room' })
    }
    const roomID = await roomModel.create(room)
    return roomID
}

export const editRoom = async (id: number, room: RoomInterface): Promise<RoomInterface> => {
    const roomID = await roomModel.findByIdAndUpdate(id, room, {new:true})
    if (!roomID) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {
        return roomID
    }
}