"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
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
    type: {
        type: Number,
        default: 0
    },
    //type 0 : normal
    //type 1 : important
    reads: {
        type: Array,
        default: []
    }
}, { timestamps: true });
const Post = mongoose.model('Post', PostSchema);
exports.default = Post;
//# sourceMappingURL=Post.js.map