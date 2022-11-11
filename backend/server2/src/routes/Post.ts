import express from "express";
import postController from "../controllers/Post";
import verifyToken from "../controllers/verifyToken";

const postRoute = express.Router()

postRoute.post('/',verifyToken,postController.createPost)
postRoute.delete('/:postId',verifyToken,postController.deletePostByPostId)
postRoute.get('/post/:postId',verifyToken,postController.getPostByPostId)
postRoute.get('/group/:groupId',verifyToken,postController.getPostByGroupId)

export default postRoute