import { readData, writeData } from "../util/dataExtract";
import { UserInterface } from "../interfaces/User";
import { ErrorApp } from "../classes/ErrorApp";
import mongoose from "mongoose";
import { userModel } from "../schemas/UserSchema";



export const getUsers = async (): Promise<UserInterface[]> => {
    const usersData = await userModel.find({})
    return usersData
}

export const getUser = async (id: any): Promise<UserInterface> => {
    const user = await userModel.findById(id)
    if (user === undefined || user === null) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {
        return user
    }
}

export const deleteUser = async (id: any): Promise<string> => {
    const userID = await userModel.findByIdAndDelete(id)
    if (userID == null) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {
        return `user with id: ${id} has been deleted`
    }

}

export const addUser = async (user: UserInterface): Promise<UserInterface> => {
    if (user === null || user === undefined) {
        throw new ErrorApp({ status: 400, message: 'Error trying to create new user' })
    }
    const dataUser = await userModel.create(user)
    return dataUser
}

export const editUser = async (id: any, user: UserInterface): Promise<UserInterface> => {
    const dataUser = await userModel.findByIdAndUpdate(id, user, {new:true})
    if (dataUser == null) {
        throw new ErrorApp({ status: 404, message: 'Error, booking doesnt exist' })
    } else {
        
        return dataUser
    }
}