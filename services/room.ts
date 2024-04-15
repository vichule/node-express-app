import { RoomInterface } from "../interfaces/Room";
import { ErrorApp } from "../classes/ErrorApp";
import { roomModel } from "../models/RoomModel";




export const getRooms = async (): Promise<RoomInterface[]> => {
    const roomsData = await roomModel.find({})
    return roomsData
}

export const getRoom = async (id: any): Promise<RoomInterface | null> => {
    try {
        return (await roomModel.findById(id))
    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })

    }

}

export const deleteRoom = async (id: any): Promise<RoomInterface | null> => {
    try {
        return (await roomModel.findByIdAndDelete(id))
    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })

    }

}

export const addRoom = async (room: RoomInterface): Promise<RoomInterface> => {
    try {
        return (await roomModel.create(room))
    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })

    }
}

export const editRoom = async (id: any, room: RoomInterface): Promise<RoomInterface | null> => {
    try {
        return (await roomModel.findByIdAndUpdate(id, room, { new: true }))
    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })
    }
    
}