import express from "express";
import notificationController from "../controllers/Notification";
import verifyToken from "../controllers/verifyToken";

const notificationRoute = express.Router()

notificationRoute.post('/friendRequest/',verifyToken,notificationController.createFriendRequestNotification)
notificationRoute.delete('/:sendUserId/:receiveUserId/:type',verifyToken,notificationController.deletedNotification)
notificationRoute.get('/:sendUserId/:receiveUserId/:type',verifyToken,notificationController.getNotification)
notificationRoute.get('/',verifyToken,notificationController.getAllNotificationsByReceiveUserId)

export default notificationRoute