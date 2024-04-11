import { readData, writeData } from "../util/dataExtract";
import { UserInterface } from "../interfaces/User";
import { ErrorApp } from "../classes/ErrorApp";
import mongoose from "mongoose";
import { userModel } from "../schemas/UserSchema";



export const getUsers = async (): Promise<UserInterface[]> => {
    try {
        return (await userModel.find({}))
    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })

    }
}

export const getUser = async (id: any): Promise<UserInterface | null> => {
    try {
        return (await userModel.findById(id))
    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })

    }
    
}

export const deleteUser = async (id: any): Promise<UserInterface | null> => {
    try {
        return (await userModel.findByIdAndDelete(id))
    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })

    }
    

}

export const addUser = async (user: UserInterface): Promise<UserInterface> => {
    try {
        return (await userModel.create(user))
    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })
    }
}

export const editUser = async (id: any, user: UserInterface): Promise<UserInterface | null> => {
    try {
        return (await userModel.findByIdAndUpdate(id, user, {new:true}))
    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })

    }
    
}