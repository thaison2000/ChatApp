import { PrismaClient } from "@prisma/client";
import{ Response } from "express";

const prisma = new PrismaClient()

const userController = {
    updateProfile: async (req: any, res: Response) =>{
        try{

            console.log(req.user)
            const userProfile = await prisma.user.update({
                where: {
                    user_id: req.user.user_id
                },
                data: {
                    name: req.body.name,
                    dateOfBirth: req.body.dateOfBirth,
                    phone: req.body.phone,
                    address: req.body.address,
                    gender: req.body.gender

                }
            })

            res.status(200).json(userProfile)
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },

    getProfile: async (req: any, res: Response) =>{
        try{

            console.log(req.user)
            const userProfile = await prisma.user.findUnique({
                where: {
                    user_id: parseInt(req.params.user_id)
                }
            })

            res.status(200).json(userProfile)
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    }

}

export default userController