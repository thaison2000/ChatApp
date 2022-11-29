import { Response } from "express";
import { uuid } from "uuidv4";

import Post from '../models/Post';

//create a post
const postController = {
    createPost: async (req: any, res: Response) => {
        const newPost = new Post({
            userId: req.user.userId,
            groupId: req.body.groupId,
            postId: `${uuid()}${Date.now()}`,
            content: req.body.content
        });
        try {
            const savePost = await newPost.save();
            res.status(200).json(savePost);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deletePostByPostId: async (req: any, res: Response) => {
        try {
            const deletePost = await Post.findOne({
                userId: req.user.userId,
                postId: req.params.postId
            });
            if(deletePost){
                await deletePost.deleteOne();
            }
            res.status(200).json('delete post successfully');
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    getPostByPostId: async (req: any, res: Response) => {
        try {
            const post = await Post.findOne({
                userId: req.user.userId,
                postId: req.params.postId
            });
            res.status(200).json(post);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    getPostByGroupId: async (req: any, res: Response) => {
        try {
            const posts = await Post.find({
                groupId: req.params.groupId
            });
            res.status(200).json(posts);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }

}

export default postController;