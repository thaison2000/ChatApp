import { PrismaClient } from "@prisma/client";
import { Response } from "express";

interface friendRequestInterface {
    sendUserId: number,
    receiveUserId: number
}

const prisma = new PrismaClient()

const FriendController = {
    createFriendRequest: async (req: any, res: Response) => {
        try {
            const friendRequest: friendRequestInterface = {
                sendUserId: req.user.userId,
                receiveUserId: req.body.receiveUserId
            }
            await prisma.friendRequest.create({
                data: friendRequest
            })
            res.status(200).json("Create friend request successfully !");
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    deleteFriendRequest: async (req: any, res: Response) => {
        try {
            await prisma.friendRequest.deleteMany({
                where: {
                    sendUserId: parseInt(req.params.sendUserId),
                    receiveUserId: parseInt(req.params.receiveUserId)
                }
            })
            res.status(200).json("Delete friend request successfully !");
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    getAllFriendRequestBySendUserId: async (req: any, res: Response) => {
        try {
            const FriendRequests = await prisma.friendRequest.findMany({
                where: {
                    sendUserId: req.user.userId
                }
            })
            res.status(200).json(FriendRequests);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getAllFriendRequestByReceiveUserId: async (req: any, res: Response) => {
        try {
            const FriendRequests = await prisma.friendRequest.findMany({
                where: {
                    receiveUserId: req.user.userId
                }
            })
            res.status(200).json(FriendRequests);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    addFriend: async (req: any, res: Response) => {
        try {
            await prisma.friend.create({
                data: {
                    userId: req.user.userId,
                    friendId: parseInt(req.body.friendId)
                }
            })
            res.status(200).json('Add friend successfully !');
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    deleteFriend: async (req: any, res: Response) => {

        try {
            await prisma.friend.deleteMany({
                where: {
                    userId: req.user.userId,
                    friendId: parseInt(req.params.friendId)
                }
            })
            res.status(200).json('Delete friend successfully !');
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getAllFriends: async (req: any, res: Response) => {

        try {
            const friends = await prisma.friend.findMany({
                where: {
                    userId: req.user.userId,
                }
            })
            res.status(200).json(friends);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}

export default FriendController
