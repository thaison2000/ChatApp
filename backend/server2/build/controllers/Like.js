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
const CommentLike_1 = __importDefault(require("../models/CommentLike"));
const PostLike_1 = __importDefault(require("../models/PostLike"));
const likeController = {
    createPostLike: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newLike = new PostLike_1.default({
                likeId: `${(0, uuidv4_1.uuid)()}${Date.now()}`,
                userId: req.body.userId,
                groupId: req.body.groupId,
                postId: req.body.postId,
            });
            yield newLike.save();
            res.status(200).json('Create Post Like successfully');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    createCommentLike: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newLike = new CommentLike_1.default({
                likeId: `${(0, uuidv4_1.uuid)()}${Date.now()}`,
                userId: req.body.userId,
                groupId: req.body.groupId,
                postId: req.body.postId,
            });
            yield newLike.save();
            res.status(200).json('Create Comment Like successfully');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    deleteLikesByLikeId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const postLike = yield PostLike_1.default.findOne({
                likeId: req.params.likeId,
            });
            if (postLike) {
                postLike.deleteOne();
            }
            const commentLike = yield CommentLike_1.default.findOne({
                likeId: req.params.likeId,
            });
            if (commentLike) {
                commentLike.deleteOne();
            }
            res.status(200).json('Delete Like successfully');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getLikesByPostId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const likes = yield PostLike_1.default.find({
                postId: req.params.postId,
            });
            res.status(200).json(likes);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getLikesByCommentId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const likes = yield PostLike_1.default.find({
                commentId: req.params.commentId,
            });
            res.status(200).json(likes);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
};
exports.default = likeController;
//# sourceMappingURL=Like.js.map