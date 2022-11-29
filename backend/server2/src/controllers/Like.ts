import { Response } from "express";
import { uuid } from "uuidv4";
import CommentLike from "../models/CommentLike";
import PostLike from "../models/PostLike";

const likeController = {
    createPostLike: async (req: any, res: Response) => {
        try {
            const newLike = new PostLike({
                likeId: `${uuid()}${Date.now()}`,
                userId: req.body.userId,
                groupId: req.body.groupId,
                postId: req.body.postId,
            });

            await newLike.save();
            res.status(200).json('Create Post Like successfully');
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    createCommentLike: async (req: any, res: Response) => {
        try {
            const newLike = new CommentLike({
                likeId: `${uuid()}${Date.now()}`,
                userId: req.body.userId,
                groupId: req.body.groupId,
                postId: req.body.postId,
            });

            await newLike.save();
            res.status(200).json('Create Comment Like successfully');
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    deleteLikesByLikeId: async (req: any, res: Response) => {
        try {
            const postLike = await PostLike.findOne({
                likeId: req.params.likeId,
            });
            if (postLike) {
                postLike.deleteOne()
            }

            const commentLike = await CommentLike.findOne({
                likeId: req.params.likeId,
            });
            if (commentLike) {
                commentLike.deleteOne()
            }

            res.status(200).json('Delete Like successfully');
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    getLikesByPostId: async (req: any, res: Response) => {
        try {
            const likes = await PostLike.find({
                postId: req.params.postId,
            });
            res.status(200).json(likes);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    getLikesByCommentId: async (req: any, res: Response) => {
        try {
            const likes = await PostLike.find({
                commentId: req.params.commentId,
            });
            res.status(200).json(likes);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
}

export default likeController