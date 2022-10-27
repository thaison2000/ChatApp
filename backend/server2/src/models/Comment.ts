const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema(
    {
        user_id: {
            type: Number,
            required: true
        },
        group_id: {
            type: Number,
            required: true
        },
        post_id: {
            type: String,
            required: true
        },
        comment_id: {
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