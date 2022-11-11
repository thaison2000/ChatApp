import { PrismaClient } from "@prisma/client";
import { Response } from "express";

const prisma = new PrismaClient()

interface userProfileUpdateInterface {
    name: string,
    dateOfBirth: string,
    gender: any,
    phone: string,
    address: string
}


const userController = {
    updateProfile: async (req: any, res: Response) => {
        try {
            const userProfileUpdate: userProfileUpdateInterface = req.body
            const userProfile = await prisma.user.update({
                where: {
                    userId: req.user.userId
                },
                data: userProfileUpdate
            })

            res.status(200).json(userProfile)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    getProfile: async (req: any, res: Response) => {
        try {
            const userProfile = await prisma.user.findUnique({
                where: {
                    userId: parseInt(req.params.userId)
                }
            })
            res.status(200).json(userProfile)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    findUserByName: async (req: any, res: Response) => {
        try {
            const users = await prisma.user.findMany({
                where: {
                    name: {
                        search: req.query.name,
                    }
                }
            })
            console.log(users)
            res.status(200).json(users)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

}

export default userController