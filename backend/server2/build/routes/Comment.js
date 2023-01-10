"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Comment_1 = __importDefault(require("../controllers/Comment"));
const verifyToken_1 = __importDefault(require("../controllers/verifyToken"));
const commentRoute = express_1.default.Router();
commentRoute.post('/', verifyToken_1.default, Comment_1.default.createComment);
commentRoute.get('/:postId', verifyToken_1.default, Comment_1.default.getCommentsByPostId);
exports.default = commentRoute;
//# sourceMappingURL=Comment.js.map