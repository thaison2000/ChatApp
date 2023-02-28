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

}

export default companyController