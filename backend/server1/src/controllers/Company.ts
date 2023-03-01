import { PrismaClient } from "@prisma/client";
import { Response } from "express";

const prisma = new PrismaClient()

interface companyProfileUpdateInterface {
    name: string,
    desc: string
}

const companyController = {
    updateProfile: async (req: any, res: Response) => {
        try {
            const companyProfileUpdate: companyProfileUpdateInterface = req.body
            const companyProfile = await prisma.company.update({
                where: {
                    companyId: parseInt(req.body.companyId)
                },
                data: companyProfileUpdate
            })

            res.status(200).json(companyProfile)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    getProfile: async (req: any, res: Response) => {
        try {
            const companyProfile = await prisma.company.findUnique({
                where: {
                    companyId: parseInt(req.params.companyId)
                }
            })
            res.status(200).json(companyProfile)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    getAllUsers: async (req: any, res: Response) => {
        try {
            
            const users = await prisma.user.findMany({
                where: {
                    companyId: parseInt(req.params.companyId)
                }
            })

            res.status(200).json(users)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    deleteUser: async (req: any, res: Response) => {
        try {
            
            const user = await prisma.user.delete({
                where: {
                    userId: parseInt(req.params.userId)
                }
            })

            res.status(200).json(user)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    lockUser: async (req: any, res: Response) => {
        try {
            
            const user = await prisma.user.update({
                where: {
                    userId: req.body.userId
                },
                data: {
                    status: 'Locked'
                }
            })

            res.status(200).json(user)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    unLockUser: async (req: any, res: Response) => {
        try {
            
            const user = await prisma.user.update({
                where: {
                    userId: req.body.userId
                },
                data: {
                    status: 'Unlocked'
                }
            })

            res.status(200).json(user)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

}

export default companyController