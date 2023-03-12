import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { redisClient } from "..";

const prisma = new PrismaClient()

const groupController = {
    createGroup: async (req: any, res: Response) => {
        try {
            const newGroup = await prisma.group.create({
                data: {
                    name: req.body.name,
                    desc: req.body.desc,
                    type: req.body.type
                }
            })
            await prisma.groupAdmin.create({
                data: {
                    groupId: newGroup.groupId,
                    userId: req.user.userId
                }
            })
            let groupUser = await prisma.groupUser.create({
                data: {
                    groupId: newGroup.groupId,
                    userId: req.user.userId
                }
            })

            const groupRedisKey = 'groups' + req.user.userId
            let groups: any = await redisClient.get(groupRedisKey)
            groups = JSON.parse(groups)
            groups.push(newGroup)
            await redisClient.set(groupRedisKey, JSON.stringify(groups));
            res.status(200).json('Create group successfully !')
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    deleteGroup: async (req: any, res: Response) => {
        try {

            const admin = await prisma.groupAdmin.findMany({
                where: {
                    userId: req.user.userId,
                    groupId: parseInt(req.params.groupId)
                }
            })
            if (admin.length > 0) {

                const users = await prisma.groupUser.findMany({
                    where: {
                        groupId: parseInt(req.params.groupId)
                    }
                })

                const deleteGroup = await prisma.group.delete({
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
                for(let i=0;i<users.length;i++){
                    const groupRedisKey = 'groups' + users[i].userId
                let groups: any = await redisClient.get(groupRedisKey)
                groups = JSON.parse(groups)
                
                groups = groups.filter((group: any) => group.groupId != deleteGroup.groupId)
                console.log(groups)
                await redisClient.set(groupRedisKey, JSON.stringify(groups));
                }
            }
            res.status(200).json('Delete group successfully !')
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    updateGroupName: async (req: any, res: Response) => {
        try {
            await prisma.group.update({
                where: {
                    groupId: req.body.groupId
                },
                data: {
                    name: req.body.name,
                }
            })
            const groupUsers = await prisma.groupUser.findMany({
                where: {
                    groupId: parseInt(req.body.groupId)
                }
            })
    
            for (let i = 0; i < groupUsers.length; i++) {
                const groupRedisKey = 'groups' + groupUsers[i].userId
                let groups: any = await redisClient.get(groupRedisKey)
                groups = JSON.parse(groups)
                groups.map((group: any) => {
                    if (group.groupId == parseInt(req.body.groupId)) {
                        group.name = req.body.name
                    }
                })
                await redisClient.set(groupRedisKey, JSON.stringify(groups));
            }

            res.status(200).json('Update group name successfully !')
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    updateGroupDesc: async (req: any, res: Response) => {
        try {
            await prisma.group.update({
                where: {
                    groupId: req.body.groupId
                },
                data: {
                    desc: req.body.desc,
                }
            })
            const groupUsers = await prisma.groupUser.findMany({
                where: {
                    groupId: parseInt(req.body.groupId)
                }
            })
    
            for (let i = 0; i < groupUsers.length; i++) {
                const groupRedisKey = 'groups' + groupUsers[i].userId
                let groups: any = await redisClient.get(groupRedisKey)
                groups = JSON.parse(groups)
                groups.map((group: any) => {
                    if (group.groupId == parseInt(req.body.groupId)) {
                        group.desc = req.body.desc
                    }
                })
                await redisClient.set(groupRedisKey, JSON.stringify(groups));
            }

            res.status(200).json('Update group desc successfully !')
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    addMember: async (req: any, res: Response) => {
        try {

            await prisma.groupUser.create({
                data: {
                    groupId: parseInt(req.body.groupId),
                    userId: parseInt(req.body.userId)
                }
            })
            let group = await prisma.group.findUnique({
                where: {
                    groupId: parseInt(req.body.groupId)
                }
            })
            const groupRedisKey = 'groups' + req.body.userId
            let groups: any = await redisClient.get(groupRedisKey)
            groups = JSON.parse(groups)
            let data = []
            if(groups){
                groups.push(group)
            }
            else{
                data.push(groups)
            }
            await redisClient.set(groupRedisKey, JSON.stringify(data));
            res.status(200).json('Add member into group successfully !')
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    //chi xoa duoc user, khong xoa duoc admin
    deleteMember: async (req: any, res: Response) => {
        try {

            await prisma.groupUser.deleteMany({
                where: {
                    groupId: parseInt(req.params.groupId),
                    userId: parseInt(req.params.userId)
                }
            })
            const groupRedisKey = 'groups' + req.params.userId
            let groups: any = await redisClient.get(groupRedisKey)
            groups = JSON.parse(groups)
            groups = groups.filter((group: any) => group.groupId != req.params.groupId)
            await redisClient.set(groupRedisKey, JSON.stringify(groups));
            res.status(200).json('Delete member in group successfully !')
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    promoteAdmin: async (req: any, res: Response) => {
        try {

            await prisma.groupAdmin.create({
                data: {
                    groupId: parseInt(req.body.groupId),
                    userId: parseInt(req.body.userId)
                }
            })
            res.status(200).json('Promote member to admin in group successfully !')
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    getAllGroups: async (req: any, res: Response) => {
        try {

            const groupRedisKey = 'groups' + req.user.userId
            let groups: any = await redisClient.get(groupRedisKey)

            // If that key exists in Redis store
            if (JSON.parse(groups)?.length > 0) {
                return res.status(200).json(JSON.parse(groups))
            }
            else {
                let data = []

                const groupUsers = await prisma.groupUser.findMany({
                    where: {
                        userId: req.user.userId
                    }
                })
                for (let i = 0; i < groupUsers.length; i++) {
                    const group = await prisma.group.findUnique({
                        where: {
                            groupId: groupUsers[i].groupId
                        }
                    })
                    if (group?.type == 'Chanel') {
                        data.push(group)
                    }

                }
                await redisClient.set(groupRedisKey, JSON.stringify(data));
                res.status(200).json(data)
            }

        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    getAllDirectMessageGroups: async (req: any, res: Response) => {
        try {
            let data = []

            const groupUsers = await prisma.groupUser.findMany({
                where: {
                    userId: req.user.userId
                }
            })
            for (let i = 0; i < groupUsers.length; i++) {
                const group = await prisma.group.findUnique({
                    where: {
                        groupId: groupUsers[i].groupId
                    }
                })
                if (group?.type == 'DirectMessage') {
                    let groupAnotherUser = await prisma.groupUser.findMany({
                        where: {
                            groupId: group.groupId
                        }
                    })

                    groupAnotherUser = groupAnotherUser.filter((groupAnotherUser: any) => {
                        return groupAnotherUser.userId != req.user.userId
                    })
                   
                    for (let i = 0; i < groupAnotherUser.length; i++) {
                        let user = await prisma.user.findUnique({
                            where: {
                                userId: groupAnotherUser[0].userId
                            }
                        })
                       
                        if(user){
                            data.push({
                                groupId: group.groupId,
                                name: user?.name,
                                avatar: user?.avatar,
                                userId: user?.userId
                            })
                           }
                    }
                  
                }
            }

            res.status(200).json(data)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    getGroupByGroupId: async (req: any, res: Response) => {
        try {
            let group = await prisma.group.findUnique({
                where: {
                    groupId: parseInt(req.params.groupId)
                }
            })

            if (group?.type == 'DirectMessage') {
                let groupAnotherUser = await prisma.groupUser.findMany({
                    where: {
                        groupId: group.groupId
                    }
                })

                groupAnotherUser = groupAnotherUser.filter((groupAnotherUser: any) => {
                    return groupAnotherUser.userId != req.user.userId
                })
                let user
                for (let i = 0; i < groupAnotherUser.length; i++) {
                    user = await prisma.user.findUnique({
                        where: {
                            userId: groupAnotherUser[0].userId
                        }
                    })
                }
                group = {
                    groupId: group.groupId,
                    name: user?.name || '',
                    avatar: user?.avatar || '',
                    desc: '',
                    type: 'DirectMessage'
                }
            }
            
            res.status(200).json(group)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    getDirectMessageByGroupId: async (req: any, res: Response) => {
        try {
            const group = await prisma.group.findUnique({
                where: {
                    groupId: parseInt(req.params.groupId)
                }
            })
            if (group) {
                let groupAnotherUser = await prisma.groupUser.findMany({
                    where: {
                        groupId: group.groupId
                    }
                })
                groupAnotherUser = groupAnotherUser.filter((groupAnotherUser: any) => {
                    return groupAnotherUser.userId != req.user.userId
                })
                let user
                for (let i = 0; i < groupAnotherUser.length; i++) {
                    user = await prisma.user.findUnique({
                        where: {
                            userId: groupAnotherUser[0].userId
                        }
                    })
                }
                return res.status(200).json({
                    groupId: group.groupId,
                    name: user?.name,
                    avatar: user?.avatar,
                    userId: user?.userId
                })
            }
            else {
                return res.status(200).json([])
            }

        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    getAllGroupMemberByGroupId: async (req: any, res: Response) => {
        try {
            let data = []
            const groupMembers = await prisma.groupUser.findMany({
                where: {
                    groupId: parseInt(req.params.groupId)
                }
            })
            for (let i = 0; i < groupMembers.length; i++) {

                //lay thong tin user
                const user = await prisma.user.findUnique({
                    where: {
                        userId: groupMembers[i].userId
                    }
                })
                //kiem tra co phai admin khong
                const admin = await prisma.groupAdmin.findMany({
                    where: {
                        groupId: groupMembers[i].groupId,
                        userId: groupMembers[i].userId
                    }
                })
                if (admin.length == 0) {
                    data.push({
                        userId: user?.userId,
                        groupId: groupMembers[i].groupId,
                        name: user?.name,
                        avatar: user?.avatar,
                        type: 'user'
                    })
                }
                else {
                    data.push({
                        userId: user?.userId,
                        groupId: groupMembers[i].groupId,
                        name: user?.name,
                        avatar: user?.avatar,
                        type: 'admin'
                    })
                }
            }
            res.status(200).json(data)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

}

export default groupController