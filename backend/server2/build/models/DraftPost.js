"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const DraftPostSchema = mongoose.Schema({
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
    }
}, { timestamps: true });
const DraftPost = mongoose.model('DraftPost', DraftPostSchema);
exports.default = DraftPost;
//# sourceMappingURL=DraftPost.js.map