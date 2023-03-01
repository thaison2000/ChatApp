"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
const Comment_1 = __importDefault(require("../models/Comment"));
const commentController = {
    createComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newComment = new Comment_1.default({
                commentId: `${(0, uuidv4_1.uuid)()}${Date.now()}`,
                content: req.body.content,
                userId: req.body.userId,
                groupId: req.body.groupId,
                postId: req.body.postId,
            });
            yield newComment.save();
            res.status(200).json(newComment);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getCommentsByPostId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const comments = yield Comment_1.default.find({
                postId: req.params.postId,
            });
            res.status(200).json(comments);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
};
exports.default = commentController;
//# sourceMappingURL=Comment.js.map