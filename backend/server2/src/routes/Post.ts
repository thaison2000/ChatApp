import express from "express";
import postController from "../controllers/Post";
import verifyToken from "../controllers/verifyToken";

const postRoute = express.Router()

postRoute.post('/',verifyToken,postController.createPost)
postRoute.post('/draftPost/',verifyToken,postController.createDraftPost)
postRoute.delete('/:postId',verifyToken,postController.deletePostByPostId)
postRoute.delete('/draftPost/:draftPostId',verifyToken,postController.deleteDraftPostByDraftPostId)
postRoute.put('/:postId',verifyToken,postController.updatePostByPostId)
postRoute.put('/draftPost/:draftPostId',verifyToken,postController.updateDraftPostByDraftPostId)
postRoute.get('/post/:postId',verifyToken,postController.getPostByPostId)
postRoute.get('/group/:groupId',verifyToken,postController.getPostByGroupId)
postRoute.get('/draftPost',verifyToken,postController.getDraftPostByUserId)
postRoute.get('/thread',verifyToken,postController.getPostThreadByUserId)

export default postRoute