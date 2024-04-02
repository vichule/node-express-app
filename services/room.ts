import { readData, writeData } from "../util/dataExtract";
import { RoomInterface } from "../interfaces/Room";

const roomsData = readData('./data/rooms.json') as RoomInterface[]

export const getRooms = (): RoomInterface[] | string => {
    if (roomsData === undefined || roomsData.length === 0) {
        return 'Error, there is no data'
    } else {
        return roomsData
    }

}

export const getRoom = (id: number): RoomInterface | string => {
    const room = roomsData.find(element => element.id === id)
    if (room === undefined || room === null) {
        return 'Error, room doesnt exist'
    } else {
        return room
    }
}

export const deleteRoom = (id: number): string => {
    const roomID = roomsData.findIndex(element => element.id === id)
    if (roomID === -1) {
        return 'Error, the room doesnt exist'
    } else {
        roomsData.splice(roomID, 1)
        writeData('./data/rooms.json', JSON.stringify(roomsData))
        return `room with id: ${id} has been deleted`
    }

}

export const addRoom = (room: RoomInterface): string => {
    if (room === null || room === undefined) {
        return 'Error trying to create new room'
    }
    roomsData.push(room)
    writeData('./data/rooms.json', JSON.stringify(roomsData))
    return 'room added successfully'
}

export const editRoom = (id: number, room: RoomInterface): string => {
    const roomID = roomsData.findIndex(element => element.id === id)
    if (roomID === -1) {
        return 'Error, the room doesnt exist'
    } else {
        roomsData.splice(roomID, 1)
        roomsData.push(room)
        writeData('./data/rooms.json', JSON.stringify(roomsData))
        return 'room edited successfully'
    }
}