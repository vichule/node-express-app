import { UserInterface } from "../interfaces/User";
import { ErrorApp } from "../classes/ErrorApp";
import { userModel } from "../models/UserModel";
import bcrypt from 'bcryptjs';


export const getUsers = async (): Promise<UserInterface[]> => {
    return (await userModel.find({}))
    
}

export const getUser = async (id: any): Promise<UserInterface | null> => {
    const userData = (await userModel.findById(id))
    if(userData === null){
        throw new ErrorApp({ status: 404, message: 'Error, user does not exist' })

    }else{
        return userData
    }
    

}

export const deleteUser = async (id: any): Promise<UserInterface | null> => {
    const userData = (await userModel.findByIdAndDelete(id))
    if (userData == null) {
        throw new ErrorApp({ status: 404, message: 'Error, user does not exist' })
    } else {
        return userData
    }


}

export const addUser = async (user: UserInterface): Promise<UserInterface> => {
    const userData = (await userModel.create(user))
    if (userData == null) {
        throw new ErrorApp({ status: 404, message: 'Error, user does not exist' })
    } else {
        return userData
    }
}

export const editUser = async (id: any, user: UserInterface): Promise<UserInterface | null> => {
        const userToEdit = await userModel.findById(id)
        if(userToEdit === null){
            throw new ErrorApp({ status: 404, message: 'Error, user does not exist' })
        }

        if (!bcrypt.compareSync(user.password, userToEdit.password)) {

            const newPassword = bcrypt.hashSync(user.password, 5)
            return (await userModel.findByIdAndUpdate(id, { ...user, password: newPassword }, { new: true }))

        } else {
            return (await userModel.findByIdAndUpdate(id, {...user, password: userToEdit.password}, { new: true }))
        }


}