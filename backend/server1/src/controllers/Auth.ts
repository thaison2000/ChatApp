import { Response } from "express";
import { loginValidation, registerValidation } from "./validation";
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface userRegisterInterface {
    email: string,
    name: string,
    password: string,
    againPassword?: string,
    companyId: number,
    userRole: number
}

interface userLoginInterface {
    email: string,
    password: string,
}

const prisma = new PrismaClient()

const authController = {
    register: async (req: any, res: Response) => {
        try {
            const userRegister: userRegisterInterface = req.body
            const { error } = registerValidation({
                email: userRegister.email,
                name: userRegister.name,
                password: userRegister.password
            })
            if (error) {
                return res.status(400).json(error.details[0].message)
            }
            if (req.body.password != req.body.againPassword) {
                return res.status(400).json('Password is not matching')
            }
            const emailExist = await prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            })
            if (emailExist) {
                return res.status(400).json('Email already exist')
            }
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            const user: userRegisterInterface = {
                email: req.body.email,
                name: req.body.name,
                password: hashedPassword,
                companyId: req.body.companyId,
                userRole: req.body.userRole
            }
            let newUser = await prisma.user.create({
                data: {
                    email: req.body.email,
                    name: req.body.name,
                    password: hashedPassword,
                    companyId: req.body.companyId,
                    userRole: req.body.userRole
                }
            })
            res.status(200).json(newUser)

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    login: async (req: any, res: Response) => {
        try {
            const userLogin: userLoginInterface = req.body
            // validate data before logged in
            const { error } = loginValidation(userLogin)
            if (error) {
                return res.status(400).json(error.details[0].message)
            }

            // checking email exist or not
            const user = await prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            })
            if (!user) {
                return res.status(400).json('Email is not found')
            }

            if (user.status == 'Locked') {
                return res.status(400).json('Your account is locked')
            }

            // checking password
            const validPass = await bcrypt.compare(req.body.password, user.password)
            if (!validPass) {
                return res.status(400).json('Invalid password')
            }

            // Create and assign token
            const token = jwt.sign({ userId: user.userId }, `${process.env.TOKEN_SECRET}`)

            res.status(200).json({
                userId: user.userId,
                name: user.name,
                email: user.email,
                phone: user.phone,
                dateOfBirth: user.dateOfBirth,
                address: user.address,
                gender: user.gender,
                avatar: user.avatar,
                companyId: user.companyId,
                status: user.status,
                jwt: token,
                userRole: user.userRole,
            })
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    changPassword: async (req: any, res: Response) => {
        try {

            const userExist = await prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            })

            // checking code
            const code = await prisma.code.findMany({
                where: {
                    userId: userExist?.userId,
                    code: parseInt(req.body.code)
                }
            })

            if (!code) {
                res.status(500).json('Wrong code')
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.newPassword, salt)

            const newUser = await prisma.user.update({
                where: {
                    email: req.body.email
                },
                data: {
                    password: hashedPassword
                }
            })
            res.status(200).json('Change password successfully')
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}


export default authController