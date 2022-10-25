import express from "express";
import notificationController from "../controllers/Notification";
import verifyToken from "../controllers/verifyToken";

const notificationRoute = express.Router()

notificationRoute.post('/',verifyToken,notificationController.createNotification)
notificationRoute.delete('/:sendUserId/:receiveUserId/:type',verifyToken,notificationController.deletedNotification)
notificationRoute.get('/:sendUserId/:receiveUserId/:type',verifyToken,notificationController.getNotification)

export default notificationRoute