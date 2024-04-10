import { readData, writeData } from "../util/dataExtract";
import { RoomInterface } from "../interfaces/Room";
import { ErrorApp } from "../classes/ErrorApp";
import { roomModel } from "../schemas/RoomSchema";




export const getRooms = async (): Promise<RoomInterface[]> => {
    const roomsData = await roomModel.find({})
    return roomsData
}

export const getRoom = async (id: any): Promise<string | RoomInterface> => {
    const room = await roomModel.findById(id)
    if (room === undefined || room === null) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {
        return room
    }
}

export const deleteRoom = async (id: any): Promise<string> => {
    const roomData = await roomModel.findByIdAndDelete(id)
    if (roomData == null) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {

        return `room with id: ${id} has been deleted`
    }

}

export const addRoom = async (room: RoomInterface): Promise<RoomInterface> => {
    if (room == null || room == undefined) {
        throw new ErrorApp({ status: 400, message: 'Error trying to create new room' })
    }
    const roomData = await roomModel.create(room)
    return roomData
}

export const editRoom = async (id: any, room: RoomInterface): Promise<RoomInterface> => {
    const roomData = await roomModel.findByIdAndUpdate(id, room, {new:true})
    if (roomData == null) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {
        return roomData
    }
}