import Joi from 'joi'
import { UserLoginInterface, UserRegisterInterface } from '../interface'

// Register validation
export const registerValidation = (userRegister: UserRegisterInterface) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(3).required()
    })
    return schema.validate(userRegister)
}

// Login validation
export const loginValidation = (userLogin: UserLoginInterface) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(3).required()     
    })
    return schema.validate(userLogin)
}