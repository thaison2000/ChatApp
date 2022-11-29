const mongoose = require('mongoose')

const CommentLikeSchema = mongoose.Schema(
    {
        likeId: {
            type: String,
            required: true
        },
        userId: {
            type: Number,
            required: true
        },
        groupId: {
            type: Number,
            required: true
        },
        commentId: {
            type: String,
            required: true
        },
    },
    { timestamps: true })

const CommentLike = mongoose.model('CommentLike', CommentLikeSchema)

export default CommentLike