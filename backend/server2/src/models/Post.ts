const mongoose = require('mongoose')

const PostSchema = mongoose.Schema(
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
        likes: {
            type: Array
        }
    },
    { timestamps: true })

const Post = mongoose.model('Post', PostSchema)

export default Post