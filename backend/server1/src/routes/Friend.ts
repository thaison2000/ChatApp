import express from "express";
import friendController from "../controllers/Friend";
import verifyToken from "../controllers/verifyToken";

const friendRoute = express.Router()

friendRoute.post('/request/',verifyToken,friendController.createFriendRequest)
friendRoute.delete('/request/:receiveUser_id',verifyToken,friendController.deleteFriendRequest)
friendRoute.get('/request/sendUser/',verifyToken,friendController.getAllFriendRequestBySendUserId)
friendRoute.get('/request/receive/',verifyToken,friendController.getAllFriendRequestByReceiveUserId)
friendRoute.post('/',verifyToken,friendController.addFriend)
friendRoute.delete('/:friend_id',verifyToken,friendController.deleteFriend)
friendRoute.get('/',verifyToken,friendController.getAllFriend)

export default friendRoute