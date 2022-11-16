import { PrismaClient } from "@prisma/client";
import{ Response } from "express";

const prisma = new PrismaClient()

const groupController = {
    createGroup: async (req: any, res: Response) =>{
        try{

            const newGroup = await prisma.group.create({
                data: {
                    name: req.body.name,
                    desc: req.body.desc
                }
            })
            await prisma.groupAdmin.create({
                data: {
                    groupId: newGroup.groupId,
                    userId: req.user.userId
                }
            })
            await prisma.groupUser.create({
                data: {
                    groupId: newGroup.groupId,
                    userId: req.user.userId
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
                    userId: req.user.userId,
                    groupId: parseInt(req.params.groupId)
                }
            })
            if(admin){
                await prisma.group.delete({
                    where: {
                        groupId: parseInt(req.params.groupId)
                    }
                })

                await prisma.groupAdmin.deleteMany({
                    where: {
                        groupId: parseInt(req.params.groupId)
                    }
                })

                await prisma.groupUser.deleteMany({
                    where: {
                        groupId: parseInt(req.params.groupId)
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
            await prisma.group.update({
                where:{
                    groupId: req.body.groupId
                },
                data: {
                    name: req.body.name,
                    desc: req.body.desc
                }
            })
            res.status(200).json('Update group successfully !')
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },

    addMember: async (req: any, res: Response) =>{
        try{

            await prisma.groupUser.create({
                data: {
                    groupId: parseInt(req.body.groupId),
                    userId: parseInt(req.body.userId)
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
            let data = []

            const groupUsers = await prisma.groupUser.findMany({
                where: {
                    userId: req.user.userId
                }
            })
            for(let i=0;i<groupUsers.length;i++){
                const group = await prisma.group.findUnique({
                    where: {
                        groupId: groupUsers[i].groupId
                    }
                })
                data.push(group)
            }
            res.status(200).json(data)
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },

    getGroupByGroupId: async (req: any, res: Response) =>{
        try{
            const group = await prisma.group.findUnique({
                where: {
                    groupId: parseInt(req.params.groupId)
                }
            })
            res.status(200).json(group)
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },

    getAllGroupMemberByGroupId: async (req: any, res: Response) =>{
        try{

            const groupMembers = await prisma.groupUser.findMany({
                where: {
                    groupId: parseInt(req.params.groupId)
                }
            })
            res.status(200).json(groupMembers)
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },

}

export default groupController