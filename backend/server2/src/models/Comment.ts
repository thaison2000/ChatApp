const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema(
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
        commentId: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
    },
    { timestamps: true })

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment