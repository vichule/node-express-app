import { readData, writeData } from "../util/dataExtract";
import { UserInterface } from "../interfaces/User";

const usersData = readData('./data/users.json') as UserInterface[]

export const getUsers = (): UserInterface[] | string => {
    if (usersData === undefined || usersData.length === 0) {
        return 'Error, there is no data'
    } else {
        return usersData
    }

}

export const getUser = (id: number): UserInterface | string => {
    const user = usersData.find(element => element.id === id)
    if (user === undefined || user === null) {
        return 'Error, user doesnt exist'
    } else {
        return user
    }
}

export const deleteUser = (id: number): string => {
    const userID = usersData.findIndex(element => element.id === id)
    if (userID === -1) {
        return 'Error, the user doesnt exist'
    } else {
        usersData.splice(userID, 1)
        writeData('./data/users.json', JSON.stringify(usersData))
        return `user with id: ${id} has been deleted`
    }

}

export const addUser = (user: UserInterface): string => {
    if (user === null || user === undefined) {
        return 'Error trying to create new user'
    }
    usersData.push(user)
    writeData('./data/user.json', JSON.stringify(usersData))
    return 'user added successfully'
}

export const editUser = (id: number, user: UserInterface): string => {
    const userID = usersData.findIndex(element => element.id === id)
    if (userID === -1) {
        return 'Error, the user doesnt exist'
    } else {
        usersData.splice(userID, 1)
        usersData.push(user)
        writeData('./data/users.json', JSON.stringify(usersData))
        return 'user edited successfully'
    }
}