"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const PostLikeSchema = mongoose.Schema({
    likeId: {
        type: String,
        required: true
    },
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
    }
}, { timestamps: true });
const PostLike = mongoose.model('PostLike', PostLikeSchema);
exports.default = PostLike;
//# sourceMappingURL=PostLike.js.map