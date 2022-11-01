const mongoose = require('mongoose')

const PostSchema = mongoose.Schema(
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