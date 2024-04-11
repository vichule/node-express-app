import { UserInterface } from "../interfaces/User";
import { ErrorApp } from "../classes/ErrorApp";
import { userModel } from "../schemas/UserSchema";
import bcrypt from 'bcryptjs';


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
        const userToEdit = await userModel.findById(id)
        if (userToEdit && !bcrypt.compareSync(user.password, userToEdit.password)) {

            const newPassword = bcrypt.hashSync(user.password, 5)
            return (await userModel.findByIdAndUpdate(id, { ...user, password: newPassword }, { new: true }))

        } else {
            return (await userModel.findByIdAndUpdate(id, user, { new: true }))
        }


    } catch (error) {
        throw new ErrorApp({ status: 500, message: 'Internal error' })

    }

}