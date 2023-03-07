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
                        contains: req.query.name,
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
    },

    findUserInGroupByName: async (req: any, res: Response) => {
        try {
            const users = await prisma.user.findMany({

                where: {
                    name: {
                        contains: req.query.name,
                    },
                }
            })
            let data = []
            for (let i = 0; i < users.length; i++) {
                const user = await prisma.groupUser.findMany({
                    where: {
                        groupId: parseInt(req.params.groupId),
                        userId: users[i].userId
                    }
                })
                if (user) {
                    const adminUser = await prisma.groupAdmin.findMany({
                        where: {
                            groupId: parseInt(req.params.groupId),
                            userId: users[i].userId
                        }
                    })
                    if(adminUser.length> 0){
                        let type = 'admin'
                        data.push({
                            userId: users[i].userId,
                            groupId: parseInt(req.params.groupId),
                            avatar: users[i].avatar,
                            type: 'admin',
                            name: users[i].name

                        })
                    }
                    else{
                        let type = 'user'
                        data.push({
                            userId: users[i].userId,
                            groupId: parseInt(req.params.groupId),
                            avatar: users[i].avatar,
                            type: 'user',
                            name: users[i].name

                        })
                    }
                }
            }
            console.log(data)
            res.status(200).json(data)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

}

export default userController