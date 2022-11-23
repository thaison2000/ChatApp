import { Response } from "express";
import { uuid } from "uuidv4";

import Notification from '../models/Notification';

//create a friend request notification
const notificationController = {
  createFriendRequestNotification: async (req: any, res: Response) => {
    try {
      const newNotification = new Notification({
        notificationId: `${uuid()}${Date.now()}`,
        sendUserId: req.body.sendUserId,
        receiveUserId: req.body.receiveUserId,
        sendUserName: req.body.sendUserName,
        type: req.body.type,
      });

      await newNotification.save();
      res.status(200).json('Create friend request notification successfully');
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  createNotification: async (req: any, res: Response) => {
    try {
      const newNotification = new Notification({
        notificationId: `${uuid()}${Date.now()}`,
        sendUserId: req.body.sendUserId,
        receiveUserId: req.body.receiveUserId,
        sendUserName: req.body.sendUserName,
        type: req.body.type,
        groupId: req.body.groupId,
        groupName: req.body.groupName,
        affectedUserName: req.body.affectedUserName
      });

      await newNotification.save();
      console.log(newNotification)
      res.status(200).json('Create notification successfully');
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  deletedNotification: async (req: any, res: Response) => {
    try {
      await Notification.deleteMany({
        sendUserId: req.params.sendUserId,
        receiveUserId: req.params.receiveUserId,
        type: req.params.type
      });
      res.status(200).json('delete friend request successfully');
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  getNotification: async (req: any, res: Response) => {
    try {
      const notification = await Notification.findOne({
        sendUserId: req.params.sendUserId,
        receiveUserId: req.params.receiveUserId,
        type: req.params.type
      });

      res.status(200).json(notification);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  getAllNotificationsByReceiveUserId: async (req: any, res: Response) => {
    try {
      const notifications = await Notification.find({
        receiveUserId: req.user.userId,
      });

      res.status(200).json(notifications);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  getAllNotificationsByGroupIds: async (req: any, res: Response) => {
    try {
      let data: any[] = []
      for(let i=0;i<req.body.groups.length;i++){
        const notifications = await Notification.find({
          groupId: req.body.groups[i].groupId,
        });
        data = data.concat(notifications)
      }     
      res.status(200).json(data);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  }

}

export default notificationController;