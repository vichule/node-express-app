import { readData, writeData } from "../util/dataExtract";
import { RoomInterface } from "../interfaces/Room";
import { ErrorApp } from "../classes/ErrorApp";



export const getRooms = (): RoomInterface[] => {
    const roomsData = readData('./data/rooms.json') as RoomInterface[]
        return roomsData
}

export const getRoom = (id: number): RoomInterface | string => {
    const room = getRooms().find(element => element.id === id)
    if (room === undefined || room === null) {
        throw new ErrorApp({status: 404, message: 'Error, booking doesnt exist'})
    } else {
        return room
    }
}

export const deleteRoom = (id: number): string => {
    const roomsData = getRooms()
    const roomID = roomsData.findIndex(element => element.id === id)
    if (roomID === -1) {
        throw new ErrorApp({status: 404, message: 'Error, booking doesnt exist'})
    } else {
        roomsData.splice(roomID, 1)
        writeData('./data/rooms.json', JSON.stringify(roomsData))
        return `room with id: ${id} has been deleted`
    }

}

export const addRoom = (room: RoomInterface): string => {
    const roomsData = getRooms()
    if (room == null || room == undefined) {
        throw new ErrorApp({status: 400, message: 'Error trying to create new room'})
    }
    roomsData.push(room)
    writeData('./data/rooms.json', JSON.stringify(roomsData))
    return 'room added successfully'
}

export const editRoom = (id: number, room: RoomInterface): string => {
    const roomsData = getRooms()
    const roomID = roomsData.findIndex(element => element.id === id)
    if (roomID === -1) {
        throw new ErrorApp({status: 404, message: 'Error, booking doesnt exist'})
    } else {
        roomsData.splice(roomID, 1)
        roomsData.push(room)
        writeData('./data/rooms.json', JSON.stringify(roomsData))
        return 'room edited successfully'
    }
}