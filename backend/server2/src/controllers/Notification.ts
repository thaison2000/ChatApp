import { Response } from "express";
import { uuid } from "uuidv4";

import Notification from '../models/Notification';

//create a friend request notification
const notificationController = {
  createFriendRequestNotification: async (req: any, res: Response) => {
    const newNotification = new Notification({
      notificationId: `${uuid()}${Date.now()}`,
      sendUserId: req.body.sendUserId,
      receiveUserId: req.body.receiveUserId,
      sendUserName: req.body.sendUserName,
      type: req.body.type,
    });
    try {
      await newNotification.save();
      res.status(200).json('Create friend request notification successfully');
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  deletedNotification: async (req: any, res: Response) => {
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
  }

}

export default notificationController;