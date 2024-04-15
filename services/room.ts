import { RoomInterface } from "../interfaces/Room";
import { ErrorApp } from "../classes/ErrorApp";
import { roomModel } from "../models/RoomModel";




export const getRooms = async (): Promise<RoomInterface[]> => {
    return (await roomModel.find({}))
}

export const getRoom = async (id: any): Promise<RoomInterface | null> => {
    const roomData = (await roomModel.findById(id))
    if (roomData === null){
        throw new ErrorApp({ status: 404, message: 'Error, room does not exist' })

    }else{
        return roomData
    }

}

export const deleteRoom = async (id: any): Promise<RoomInterface | null> => {
    const roomData = (await roomModel.findByIdAndDelete(id))
    if (roomData === null){
        throw new ErrorApp({ status: 404, message: 'Error, room does not exist' })

    }else{
        return roomData
    }

}

export const addRoom = async (room: RoomInterface): Promise<RoomInterface> => {
    const roomData = (await roomModel.create(room))
    if (roomData === null){
        throw new ErrorApp({ status: 404, message: 'Error, room does not exist' })

    }else{
        return roomData
    }
}

export const editRoom = async (id: any, room: RoomInterface): Promise<RoomInterface | null> => {
    const roomData = (await roomModel.findByIdAndUpdate(id, room, { new: true }))
    if (roomData === null){
        throw new ErrorApp({ status: 404, message: 'Error, room does not exist' })

    }else{
        return roomData
    }
    
}