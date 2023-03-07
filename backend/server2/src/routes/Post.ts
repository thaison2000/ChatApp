import express from "express";
import postController from "../controllers/Post";
import verifyToken from "../controllers/verifyToken";

const postRoute = express.Router()

postRoute.post('/',verifyToken,postController.createPost)
postRoute.post('/draftPost/',verifyToken,postController.createDraftPost)
postRoute.delete('/:postId',verifyToken,postController.deletePostByPostId)
postRoute.delete('/group/:groupId',verifyToken,postController.deletePostByGroupId)
postRoute.delete('/draftPost/:draftPostId',verifyToken,postController.deleteDraftPostByDraftPostId)
postRoute.put('/:postId',verifyToken,postController.updatePostByPostId)
postRoute.put('/active/:postId',verifyToken,postController.activeImporttantPostByPostId)
postRoute.put('/inactive/:postId',verifyToken,postController.inactiveImporttantPostByPostId)
postRoute.put('/draftPost/:draftPostId',verifyToken,postController.updateDraftPostByDraftPostId)
postRoute.get('/post/:postId',verifyToken,postController.getPostByPostId)
postRoute.get('/group/:groupId',verifyToken,postController.getPostByGroupId)
postRoute.get('/group/important/:groupId',verifyToken,postController.getImportantPostByGroupId)
postRoute.get('/draftPost',verifyToken,postController.getDraftPostByUserId)
postRoute.get('/thread',verifyToken,postController.getPostThreadByUserId)
postRoute.get('/mention',verifyToken,postController.getAllMentionPostByUserId)
postRoute.get('/unreadPosts',verifyToken,postController.getAllUnreadPosts)
postRoute.put('/unreadPosts/:groupId',verifyToken,postController.updateAllUnreadPostsToReadPostsByGroupId)
postRoute.post('/search',verifyToken,postController.getFullTextSearchPostByUserIdAndGroupIds)


export default postRoute