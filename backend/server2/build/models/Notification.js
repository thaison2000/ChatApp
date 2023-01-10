"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const NotificationSchema = mongoose.Schema({
    notificationId: {
        type: String,
        required: true
    },
    sendUserId: {
        type: String,
        required: true
    },
    receiveUserId: {
        type: String,
    },
    sendUserName: {
        type: String,
    },
    post: {
        type: String,
    },
    type: {
        type: Number
    },
    groupId: {
        type: Number
    },
    groupName: {
        type: String
    },
    affectedUserName: {
        type: String
    }
    // 1 la like
    // 2 la comment
    // 3 la unsendFriendRequest
    // 4 la sendFriendRequest
    // 5 la acceptAddfriend
    // 6 la rejectAddfriend
    // 7 la unfriend
    // 8 la chat
    // 9 la them user vao chanel
    // 10 la xoa user khoi chanel
    // 11 la thang cap user len admin
    // 12 la xoa chanel
    // 13 la xoa like
    // 14 la xoa comment
    // 15 la xoa post
    // 16 la sua tin nhan
    // 17 la active tin nhan thanh important
    // 18 la inactive tin nhan important
}, { timestamps: true });
const Notification = mongoose.model('Notification', NotificationSchema);
exports.default = Notification;
//# sourceMappingURL=Notification.js.map