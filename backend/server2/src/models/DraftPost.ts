const mongoose = require('mongoose')

const DraftPostSchema = mongoose.Schema(
    {
        userId: {
            type: Number,
            required: true
        },
        draftPostId: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        fileNames: {
            type: Array,
            default: []
        }    
    },
    { timestamps: true })

const DraftPost = mongoose.model('DraftPost', DraftPostSchema)

export default DraftPost