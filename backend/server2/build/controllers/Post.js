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
const DraftPost_1 = __importDefault(require("../models/DraftPost"));
const Post_1 = __importDefault(require("../models/Post"));
//create a post
const postController = {
    createPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newPost = new Post_1.default({
            userId: req.user.userId,
            groupId: req.body.groupId,
            postId: `${(0, uuidv4_1.uuid)()}${Date.now()}`,
            content: req.body.content,
            read: [req.user.userId]
        });
        try {
            const savePost = yield newPost.save();
            res.status(200).json(savePost);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }),
    createDraftPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newPost = new DraftPost_1.default({
            userId: req.user.userId,
            draftPostId: `${(0, uuidv4_1.uuid)()}${Date.now()}`,
            content: req.body.content
        });
        try {
            const savePost = yield newPost.save();
            res.status(200).json(savePost);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }),
    deletePostByPostId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deletePost = yield Post_1.default.findOne({
                userId: req.user.userId,
                postId: req.params.postId
            });
            if (deletePost) {
                yield deletePost.deleteOne();
            }
            res.status(200).json('delete post successfully');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    deletePostByGroupId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deletePost = yield Post_1.default.findMany({
                userId: req.user.userId,
                groupId: req.params.groupId
            });
            if (deletePost) {
                yield deletePost.deleteMany();
            }
            res.status(200).json('delete posts successfully');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    deleteDraftPostByDraftPostId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deletePost = yield DraftPost_1.default.findOne({
                userId: req.user.userId,
                draftPostId: req.params.draftPostId
            });
            if (deletePost) {
                yield deletePost.deleteOne();
            }
            res.status(200).json('delete post successfully');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    updatePostByPostId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatePost = yield Post_1.default.updateOne({
                userId: req.user.userId,
                postId: req.params.postId
            }, {
                content: req.body.content
            });
            if (updatePost) {
                return res.status(200).json('update post successfully');
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    updateAllUnreadPostsToReadPostsByGroupId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts = yield Post_1.default.find({
                groupId: req.params.groupId
            });
            for (let i = 0; i < posts.length; i++) {
                if (!posts[i].reads.includes(req.user.userId)) {
                    const updatePost = yield Post_1.default.updateOne({
                        postId: posts[i].postId,
                        groupId: req.params.groupId
                    }, { $push: { reads: req.user.userId } });
                }
            }
            return res.status(200).json('update read posts successfully');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getAllUnreadPosts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const unreadPosts = yield Post_1.default.find({
                reads: { $nin: [req.user.userId] }
            });
            res.status(200).json(unreadPosts);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    activeImporttantPostByPostId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatePost = yield Post_1.default.updateOne({
                userId: req.user.userId,
                postId: req.params.postId
            }, {
                type: 1
            });
            if (updatePost) {
                return res.status(200).json('update post successfully');
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    inactiveImporttantPostByPostId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatePost = yield Post_1.default.updateOne({
                userId: req.user.userId,
                postId: req.params.postId
            }, {
                type: 0
            });
            if (updatePost) {
                return res.status(200).json('update post successfully');
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    updateDraftPostByDraftPostId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatePost = yield DraftPost_1.default.findOne({
                userId: req.user.userId,
                draftPpostId: req.params.draftPostId
            });
            yield updatePost.updateOne({
                $set: {
                    content: req.body.content
                }
            });
            res.status(200).json('update draft post successfully');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getPostByPostId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const post = yield Post_1.default.findOne({
                userId: req.user.userId,
                postId: req.params.postId
            });
            res.status(200).json(post);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getPostByGroupId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts = yield Post_1.default.find({
                groupId: req.params.groupId
            });
            res.status(200).json(posts);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getImportantPostByGroupId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts = yield Post_1.default.find({
                groupId: req.params.groupId,
                type: 1
            });
            res.status(200).json(posts);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getDraftPostByUserId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const draftPosts = yield DraftPost_1.default.find({
                userId: req.user.userId
            });
            res.status(200).json(draftPosts);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getPostThreadByUserId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            var postThread = [];
            let postThreadByPost = yield Post_1.default.find({
                userId: req.user.userId
            });
            const postThreadByComment = yield Comment_1.default.find({
                userId: req.user.userId
            });
            for (let i = 0; i < postThreadByComment.length; i++) {
                let post = yield Post_1.default.find({
                    postId: postThreadByComment[i].postId
                });
                postThreadByPost.push(post);
            }
            postThread = postThreadByPost;
            //sap xep theo thoi gian gan nhat
            postThread = postThread === null || postThread === void 0 ? void 0 : postThread.sort((p1, p2) => {
                let time1 = new Date(p2.createdAt);
                let time2 = new Date(p1.createdAt);
                return (time2 - time1);
            });
            //loai bo trung lap
            function deduplicate(arr) {
                let isExist = (arr, x) => arr.some((element) => element.postId == x.postId);
                let ans = [];
                arr.forEach((element) => {
                    if (!isExist(ans, element))
                        ans.push(element);
                });
                return ans;
            }
            postThread = deduplicate(postThread);
            res.status(200).json(postThread);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
};
exports.default = postController;
//# sourceMappingURL=Post.js.map