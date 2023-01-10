"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Like_1 = __importDefault(require("../controllers/Like"));
const verifyToken_1 = __importDefault(require("../controllers/verifyToken"));
const likeRoute = express_1.default.Router();
likeRoute.post('/postLike', verifyToken_1.default, Like_1.default.createPostLike);
likeRoute.post('/commentLike', verifyToken_1.default, Like_1.default.createCommentLike);
likeRoute.get('/post/:postId', verifyToken_1.default, Like_1.default.getLikesByPostId);
likeRoute.get('/comment/:commentId', verifyToken_1.default, Like_1.default.getLikesByCommentId);
likeRoute.delete('/:likeId', verifyToken_1.default, Like_1.default.deleteLikesByLikeId);
exports.default = likeRoute;
//# sourceMappingURL=Like.js.map