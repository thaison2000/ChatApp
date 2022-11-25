import express from "express";
import commentController from "../controllers/Comment";
import verifyToken from "../controllers/verifyToken";

const commentRoute = express.Router()

commentRoute.post('/',verifyToken,commentController.createComment)
commentRoute.get('/:postId',verifyToken,commentController.getCommentsByPostId)


export default commentRoute