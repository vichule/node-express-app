import { readData, writeData } from "../util/dataExtract";
import { RoomInterface } from "../interfaces/Room";
import { Response } from "express";

const roomsData = readData('./data/rooms.json') as RoomInterface[]

export const getRooms = (res : Response): RoomInterface[] | string => {
    if (roomsData === undefined || roomsData.length === 0) {
        res.status(404)
        return 'Error, there is no data'
    } else {
        return roomsData
    }

}

export const getRoom = (id: number, res: Response): RoomInterface | string => {
    const room = roomsData.find(element => element.id === id)
    if (room === undefined || room === null) {
        res.status(404)
        return 'Error, room doesnt exist'
    } else {
        return room
    }
}

export const deleteRoom = (id: number, res: Response): string => {
    const roomID = roomsData.findIndex(element => element.id === id)
    if (roomID === -1) {
        res.status(404)
        return 'Error, the room doesnt exist'
    } else {
        roomsData.splice(roomID, 1)
        writeData('./data/rooms.json', JSON.stringify(roomsData))
        return `room with id: ${id} has been deleted`
    }

}

export const addRoom = (room: RoomInterface, res: Response): string => {
    if (room == null || room == undefined) {
        res.status(400)
        return 'Error trying to create new room'
    }
    roomsData.push(room)
    writeData('./data/rooms.json', JSON.stringify(roomsData))
    return 'room added successfully'
}

export const editRoom = (id: number, room: RoomInterface, res: Response): string => {
    const roomID = roomsData.findIndex(element => element.id === id)
    if (roomID === -1) {
        res.status(404)
        return 'Error, the room doesnt exist'
    } else {
        roomsData.splice(roomID, 1)
        roomsData.push(room)
        writeData('./data/rooms.json', JSON.stringify(roomsData))
        return 'room edited successfully'
    }
}