const mongoose = require('mongoose')

const LikeSchema = mongoose.Schema(
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

const Like = mongoose.model('Like', LikeSchema)

export default Like