const mongoose = require('mongoose')

const PostLikeSchema = mongoose.Schema(
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

const PostLike = mongoose.model('Like', PostLikeSchema)

export default PostLike