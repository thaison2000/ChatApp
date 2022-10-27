const mongoose = require('mongoose')

const LikeSchema = mongoose.Schema(
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
    },
    { timestamps: true })

const Like = mongoose.model('Like', LikeSchema)

export default Like