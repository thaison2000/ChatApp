"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Post_1 = __importDefault(require("../controllers/Post"));
const verifyToken_1 = __importDefault(require("../controllers/verifyToken"));
const postRoute = express_1.default.Router();
postRoute.post('/', verifyToken_1.default, Post_1.default.createPost);
postRoute.post('/draftPost/', verifyToken_1.default, Post_1.default.createDraftPost);
postRoute.delete('/:postId', verifyToken_1.default, Post_1.default.deletePostByPostId);
postRoute.delete('/group/:groupId', verifyToken_1.default, Post_1.default.deletePostByGroupId);
postRoute.delete('/draftPost/:draftPostId', verifyToken_1.default, Post_1.default.deleteDraftPostByDraftPostId);
postRoute.put('/:postId', verifyToken_1.default, Post_1.default.updatePostByPostId);
postRoute.put('/active/:postId', verifyToken_1.default, Post_1.default.activeImporttantPostByPostId);
postRoute.put('/inactive/:postId', verifyToken_1.default, Post_1.default.inactiveImporttantPostByPostId);
postRoute.put('/draftPost/:draftPostId', verifyToken_1.default, Post_1.default.updateDraftPostByDraftPostId);
postRoute.get('/post/:postId', verifyToken_1.default, Post_1.default.getPostByPostId);
postRoute.get('/group/:groupId', verifyToken_1.default, Post_1.default.getPostByGroupId);
postRoute.get('/group/important/:groupId', verifyToken_1.default, Post_1.default.getImportantPostByGroupId);
postRoute.get('/draftPost', verifyToken_1.default, Post_1.default.getDraftPostByUserId);
postRoute.get('/thread', verifyToken_1.default, Post_1.default.getPostThreadByUserId);
postRoute.get('/unreadPosts', verifyToken_1.default, Post_1.default.getAllUnreadPosts);
postRoute.put('/unreadPosts/:groupId', verifyToken_1.default, Post_1.default.updateAllUnreadPostsToReadPostsByGroupId);
exports.default = postRoute;
//# sourceMappingURL=Post.js.map