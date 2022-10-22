import express, { Request, Response } from "express";
import { loginValidation, registerValidation } from "./validation";
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const authController = {
    register: async (req: any, res: Response) => {
        try {

            // validate data before saving a user
            const { error } = registerValidation({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            if (error) {
                return res.status(400).json(error.details[0].message)
            }

            //check match password
            if (req.body.password != req.body.againPassword) {
                return res.status(400).json('Password is not matching !')
            }

            // checking user exist or not
            const emailExist = await prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            })
            if (emailExist) {
                return res.status(400).json('Email already exist')
            }

            // hash password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            //create account
            let newUser = await prisma.user.create({
                data: {
                    email: req.body.email,
                    name: req.body.name,
                    password: hashedPassword,
                    phone: '',
                    address: '',
                    dateOfBirth: ''
                }
            })
            res.status(200).json({
                userId: newUser.user_id,
                email: newUser.email,
                username: newUser.name,
            })

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    login: async (req: any, res: Response) => {
        try {

            // validate data before logged in
            const { error } = loginValidation(req.body)
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
                return res.status(400).json('Email is not found!')
            }
            console.log(user)

            // checking password
            const validPass = await bcrypt.compare(req.body.password, user.password)
            if (!validPass) {
                return res.status(400).json('Invalid password')
            }

            // Create and assign token
            const token = jwt.sign({ userId: user.user_id }, `${process.env.TOKEN_SECRET}`)

            res.status(200).json({
                user_id: user.user_id,
                username: user.name,
                email: user.email,
                jwt: token
            })
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}


export default authController