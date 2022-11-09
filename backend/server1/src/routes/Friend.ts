import express from "express";
import friendController from "../controllers/Friend";
import verifyToken from "../controllers/verifyToken";

const friendRoute = express.Router()

friendRoute.post('/request/',verifyToken,friendController.createFriendRequest)
friendRoute.delete('/request/:sendUserId/:receiveUserId',verifyToken,friendController.deleteFriendRequest)
friendRoute.get('/request/sendUser/',verifyToken,friendController.getAllFriendRequestBySendUserId)
friendRoute.get('/request/receiveUser/',verifyToken,friendController.getAllFriendRequestByReceiveUserId)
friendRoute.post('/',verifyToken,friendController.addFriend)
friendRoute.delete('/:friendId',verifyToken,friendController.deleteFriend)
friendRoute.get('/',verifyToken,friendController.getAllFriends)

export default friendRoute