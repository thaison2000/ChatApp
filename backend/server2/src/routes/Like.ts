import express from "express";
import likeController from "../controllers/Like";
import verifyToken from "../controllers/verifyToken";

const likeRoute = express.Router()

likeRoute.post('/postLike',verifyToken,likeController.createPostLike)
likeRoute.post('/commentLike',verifyToken,likeController.createCommentLike)
likeRoute.get('/post/:postId',verifyToken,likeController.getLikesByPostId)
likeRoute.get('/comment/:commentId',verifyToken,likeController.getLikesByCommentId)
likeRoute.delete('/:likeId',verifyToken,likeController.deleteLikesByLikeId)

export default likeRoute