import { PrismaClient } from "@prisma/client";
import{ Response } from "express";

const prisma = new PrismaClient()

const groupController = {
    createGroup: async (req: any, res: Response) =>{
        try{

            const newGroup = await prisma.group.create({
                data: {
                    name: req.body.name,
                    desc: req.body.desc,
                    avatar: ''
                }
            })
            const newGroupAdmin = await prisma.groupAdmin.create({
                data: {
                    group_id: newGroup.group_id,
                    user_id: req.user.user_id
                }
            })
            res.status(200).json('Create group successfully !')
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },
    
    deleteGroup: async (req: any, res: Response) =>{
        try{

            const admin = await prisma.groupAdmin.findMany({
                where: {
                    user_id: req.user.user_id,
                    group_id: req.params.group_id
                }
            })
            if(admin){
                await prisma.group.delete({
                    where: {
                        group_id: req.params.group_id
                    }
                })

                await prisma.groupAdmin.deleteMany({
                    where: {
                        group_id: req.params.group_id
                    }
                })

                await prisma.groupUser.deleteMany({
                    where: {
                        group_id: req.params.group_id
                    }
                })
            }
            res.status(200).json('Delete group successfully !')
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },

    updateGroup: async (req: any, res: Response) =>{
        try{

            const newGroup = await prisma.group.update({
                where:{
                    group_id: req.body.group_id
                },
                data: {
                    name: req.body.name,
                    desc: req.body.desc
                }
            })
            const newGroupAdmin = await prisma.groupAdmin.create({
                data: {
                    group_id: newGroup.group_id,
                    user_id: req.user.user_id
                }
            })
            res.status(200).json('Create group successfully !')
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },

    addMember: async (req: any, res: Response) =>{
        try{

            const newMember = await prisma.groupUser.create({
                data: {
                    group_id: req.body.group_id,
                    user_id: req.body.user_id
                }
            })
            res.status(200).json('Add member into group successfully !')
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },
    getAllGroups: async (req: any, res: Response) =>{
        try{

            const groups = await prisma.group.findMany({
                where: {
                }
            })
            res.status(200).json(groups)
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },

}

export default groupController