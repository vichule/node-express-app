import { readData, writeData } from "../util/dataExtract";
import { UserInterface } from "../interfaces/User";
import { Response } from "express";

const usersData = readData('./data/users.json') as UserInterface[]

export const getUsers = (res : Response): UserInterface[] | string => {
    if (usersData === undefined || usersData.length === 0) {
        res.status(404)
        return 'Error, there is no data'
    } else {
        return usersData
    }

}

export const getUser = (id: number, res : Response): UserInterface | string => {
    const user = usersData.find(element => element.id === id)
    if (user === undefined || user === null) {
        res.status(404)
        return 'Error, user doesnt exist'
    } else {
        return user
    }
}

export const deleteUser = (id: number,res : Response): string => {
    const userID = usersData.findIndex(element => element.id === id)
    if (userID === -1) {
        res.status(404)
        return 'Error, the user doesnt exist'
    } else {
        usersData.splice(userID, 1)
        writeData('./data/users.json', JSON.stringify(usersData))
        return `user with id: ${id} has been deleted`
    }

}

export const addUser = (user: UserInterface,res : Response): string => {
    if (user === null || user === undefined) {
        res.status(400)
        return 'Error trying to create new user'
    }
    usersData.push(user)
    writeData('./data/user.json', JSON.stringify(usersData))
    return 'user added successfully'
}

export const editUser = (id: number, user: UserInterface,res : Response): string => {
    const userID = usersData.findIndex(element => element.id === id)
    if (userID === -1) {
        res.status(404)
        return 'Error, the user doesnt exist'
    } else {
        usersData.splice(userID, 1)
        usersData.push(user)
        writeData('./data/users.json', JSON.stringify(usersData))
        return 'user edited successfully'
    }
}