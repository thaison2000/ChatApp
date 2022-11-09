import { Response } from "express";

import Notification from '../models/Notification';

//create a notification
const notificationController = {
    createNotification: async (req: any, res: Response) => {
        const newNotification = new Notification({
          sendUserId: req.body.sendUserId,
          receiveUserId: req.body.receiveUserId,
          type: req.body.type,
          post: req.body.post
        });
        try {
          const savedNotification = await newNotification.save();
          res.status(200).json(savedNotification);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    deletedNotification: async (req:any, res:Response) => {
        try {
          const deletedNotification = await Notification.findOne({
            sendUserId: req.params.sendUserId,
            receiveUserId: req.params.receiveUserId, 
            type: req.params.type
        });
          await deletedNotification.deleteOne();
          res.status(200).json('delete friend request successfully');
        } catch (err) {
            console.log(err)
          res.status(500).json(err);
        }
    },

    getNotification: async (req: any, res: Response) => {
        try {
          const FriendRequestNotification = await Notification.findOne({
              sendUserId: req.params.sendUserId,
              receiveUserId: req.params.receiveUserId,
              type: req.params.type
          });
          console.log(FriendRequestNotification)
          
          res.status(200).json(FriendRequestNotification);
        } catch (err) {
            console.log(err)
          res.status(500).json(err);
        }
      }

}

export default notificationController;