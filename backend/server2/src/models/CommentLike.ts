const mongoose = require('mongoose')

const CommentLikeSchema = mongoose.Schema(
    {
        userId: {
            type: Number,
            required: true
        },
        groupId: {
            type: Number,
            required: true
        },
        postId: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
    },
    { timestamps: true })

const CommentLike = mongoose.model('Like', CommentLikeSchema)

export default CommentLike