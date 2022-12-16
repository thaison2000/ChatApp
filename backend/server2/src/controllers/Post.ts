import { Response } from "express";
import { uuid } from "uuidv4";
import Comment from "../models/Comment";
import DraftPost from "../models/DraftPost";

import Post from '../models/Post';

//create a post
const postController = {
    createPost: async (req: any, res: Response) => {
        const newPost = new Post({
            userId: req.user.userId,
            groupId: req.body.groupId,
            postId: `${uuid()}${Date.now()}`,
            content: req.body.content,
            read: [req.user.userId]
        });
        try {
            const savePost = await newPost.save();
            res.status(200).json(savePost);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    createDraftPost: async (req: any, res: Response) => {
        const newPost = new DraftPost({
            userId: req.user.userId,
            draftPostId: `${uuid()}${Date.now()}`,
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
            if (deletePost) {
                await deletePost.deleteOne();
            }
            res.status(200).json('delete post successfully');
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    deletePostByGroupId: async (req: any, res: Response) => {
        try {
            const deletePost = await Post.findMany({
                userId: req.user.userId,
                groupId: req.params.groupId
            });
            if (deletePost) {
                await deletePost.deleteMany();
            }
            res.status(200).json('delete posts successfully');
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    deleteDraftPostByDraftPostId: async (req: any, res: Response) => {
        try {
            const deletePost = await DraftPost.findOne({
                userId: req.user.userId,
                draftPostId: req.params.draftPostId
            });
            if (deletePost) {
                await deletePost.deleteOne();
            }
            res.status(200).json('delete post successfully');
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    updatePostByPostId: async (req: any, res: Response) => {
        try {
            const updatePost = await Post.updateOne({
                userId: req.user.userId,
                postId: req.params.postId
            },
                {
                    content: req.body.content
                });
            if (updatePost) {
                return res.status(200).json('update post successfully');
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    updateAllUnreadPostsToReadPostsByGroupId: async (req: any, res: Response) => {
        try {

            const updatePost = await Post.updateMany({
                groupId: req.params.groupId
            },
            { $push: { read: req.user.userId } })
            
            return res.status(200).json('update read posts successfully');
            
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    getAllUnreadPosts: async (req: any, res: Response) => {
        try {

            const unreadPosts = await Post.find({
                read: { $nin: [req.user.userId] } 
            })
            console.log(unreadPosts)
            res.status(200).json(unreadPosts);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    activeImporttantPostByPostId: async (req: any, res: Response) => {
        try {
            const updatePost = await Post.updateOne({
                userId: req.user.userId,
                postId: req.params.postId
            },
                {
                    type: 1
                });
            if (updatePost) {
                return res.status(200).json('update post successfully');
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    inactiveImporttantPostByPostId: async (req: any, res: Response) => {
        try {
            const updatePost = await Post.updateOne({
                userId: req.user.userId,
                postId: req.params.postId
            },
                {
                    type: 0
                });
            if (updatePost) {
                return res.status(200).json('update post successfully');
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    updateDraftPostByDraftPostId: async (req: any, res: Response) => {
        try {
            const updatePost = await DraftPost.findOne({
                userId: req.user.userId,
                draftPpostId: req.params.draftPostId
            }
            );
            await updatePost.updateOne({
                $set: {
                    content: req.body.content
                }
            })
            res.status(200).json('update draft post successfully');
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
    },

    getImportantPostByGroupId: async (req: any, res: Response) => {
        try {
            const posts = await Post.find({
                groupId: req.params.groupId,
                type: 1
            });
            res.status(200).json(posts);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    getDraftPostByUserId: async (req: any, res: Response) => {
        try {
            const draftPosts = await DraftPost.find({
                userId: req.user.userId
            });
            res.status(200).json(draftPosts);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    getPostThreadByUserId: async (req: any, res: Response) => {
        try {
            var postThread
            const postThreadByPost = await Post.find({
                userId: req.user.userId
            });
            const postThreadByComment = await Comment.find({
                userId: req.user.userId
            });
            for (let i = 0; i < postThreadByComment.length; i++) {
                let post = await Post.find({
                    postId: postThreadByComment[i].postId
                });
                postThread = postThreadByPost.concat(post)

            }
            console.log(postThread)
            //sap xep theo thoi gian gan nhat
            postThread = postThread.sort((p1: any, p2: any) => {
                let time1: any = new Date(p2.createdAt)
                let time2: any = new Date(p1.createdAt)
                return (time2 - time1);
            })

            //loai bo trung lap
            function deduplicate(arr: any) {
                let isExist = (arr: any, x: any) => arr.some((element: any) => element.postId == x.postId);
                let ans: Array<any> = [];

                arr.forEach((element: any) => {
                    if (!isExist(ans, element)) ans.push(element);
                });
                return ans;
            }
            postThread = deduplicate(postThread)
            res.status(200).json(postThread);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

}

export default postController;