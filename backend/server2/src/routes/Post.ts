import express from "express";
import postController from "../controllers/Post";
import verifyToken from "../controllers/verifyToken";

const postRoute = express.Router()

postRoute.post('/',verifyToken,postController.createPost)
postRoute.delete('/:post_id',verifyToken,postController.deletePostByPostId)
postRoute.get('/post/:post_id',verifyToken,postController.getPostByPostId)
postRoute.get('/group/:group_id',verifyToken,postController.getPostByGroupId)

export default postRoute