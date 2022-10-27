import { Response } from "express";

import Post from '../models/Post';

//create a post
const postController = {
    createPost: async (req: any, res: Response) => {
        const newPost = new Post({
            user_id: req.user.user_id,
            group_id: req.body.group_id,
            post_id: req.body.post_id,
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
                user_id: req.user.user_id,
                post_id: req.params.post_id
            });
            await deletePost.deleteOne();
            res.status(200).json('delete post successfully');
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    getPostByPostId: async (req: any, res: Response) => {
        try {
            const post = await Post.findOne({
                user_id: req.user_id,
                post_id: req.params.post_id
            });
            res.status(200).json(post);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }

}

export default postController;