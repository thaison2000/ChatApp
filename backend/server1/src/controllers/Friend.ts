import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient()

const FriendController = {
    createFriendRequest: async (req: any, res: Response)=>{

        try {
            const newFriendRequest = await prisma.friendRequest.create({
                data: {
                    sendUser_id: req.user.user_id,
                    receiveUser_id: req.body.friend_id
                }
            })
            res.status(200).json("Create friend request successfully !");
          } catch (err) {
            res.status(500).json(err);
          }
    },

    deleteFriendRequest: async (req: any, res: Response)=>{

        try {
            const deleteFriendRequest = await prisma.friendRequest.deleteMany({
                where: {
                    sendUser_id: req.user.user_id,
                    receiveUser_id: req.params.receiveUser_id
                }
            })
            res.status(200).json("Delete friend request successfully !");
          } catch (err) {
            res.status(500).json(err);
          }
    },

    getAllFriendRequestBySendUserId: async (req: any, res: Response)=>{

        try {
            const FriendRequests = await prisma.friendRequest.findMany({
                where: {
                    sendUser_id: req.user.user_id
                }
            })
            res.status(200).json(FriendRequests);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    getAllFriendRequestByReceiveUserId: async (req: any, res: Response)=>{

        try {
            const FriendRequests = await prisma.friendRequest.findMany({
                where: {
                    receiveUser_id: req.user.user_id
                }
            })
            res.status(200).json(FriendRequests);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    addFriend: async (req: any, res: Response)=>{

        try {
            const friend = await prisma.friend.create({
                data: {
                    user_id: req.user.user_id,
                    friend_id: req.body.friend_id
                }
            })
            res.status(200).json('Add friend successfully !');
          } catch (err) {
            res.status(500).json(err);
          }
    },

    deleteFriend: async (req: any, res: Response)=>{

        try {
            const friend = await prisma.friend.deleteMany({
                where: {
                    user_id: req.user.user_id,
                    friend_id: req.params.friend_id
                }
            })
            res.status(200).json('Delete friend successfully !');
          } catch (err) {
            res.status(500).json(err);
          }
    },

    getAllFriend: async (req: any, res: Response)=>{

        try {
            const friends = await prisma.friend.findMany({
                where: {
                    user_id: req.user.user_id,
                }
            })
            res.status(200).json(friends);
          } catch (err) {
            res.status(500).json(err);
          }
    },
}

export default FriendController
