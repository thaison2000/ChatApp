import express from "express";
import postController from "../controllers/Post";
import verifyToken from "../controllers/verifyToken";

const postRoute = express.Router()

postRoute.post('/',verifyToken,postController.createPost)
postRoute.delete('/:post_id',verifyToken,postController.deletePostByPostId)
postRoute.get('/:post_id',verifyToken,postController.getPostByPostId)

export default postRoute