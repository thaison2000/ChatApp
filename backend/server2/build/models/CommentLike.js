"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const CommentLikeSchema = mongoose.Schema({
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
    commentId: {
        type: String,
        required: true
    },
}, { timestamps: true });
const CommentLike = mongoose.model('CommentLike', CommentLikeSchema);
exports.default = CommentLike;
//# sourceMappingURL=CommentLike.js.map