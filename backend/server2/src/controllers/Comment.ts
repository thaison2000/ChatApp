import { Response } from "express";
import { uuid } from "uuidv4";
import Comment from "../models/Comment";

const commentController = {
    createComment: async (req: any, res: Response) => {
      try {
        const newComment = new Comment({
          commentId: `${uuid()}${Date.now()}`,
          content: req.body.content,
          userId: req.body.userId,
          groupId: req.body.groupId,
          postId: req.body.postId,
        });
  
        await newComment.save();
        res.status(200).json('Create comment successfully');
      } catch (err) {
        console.log(err)
        res.status(500).json(err);
      }
    },

    getCommentsByPostId: async (req: any, res: Response) => {
        try {
          const comments = await Comment.find({
            postId: req.params.postId,
          });
          
          res.status(200).json(comments);
        } catch (err) {
          console.log(err)
          res.status(500).json(err);
        }
      },
}

export default commentController