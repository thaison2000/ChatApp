const mongoose = require('mongoose')

const NotificationSchema = mongoose.Schema(
    {
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
            required: true
        },
        post: {
            type: String,
        },
        type: {
            type: Number
        }
        // 1 la like
        // 2 la comment
        // 3 la unsendFriendRequest
        // 4 la sendFriendRequest
        // 5 la acceptAddfriend
        // 6 la rejectAddfriend
        // 7 la unfriend
        // 8 la chat
    },
    { timestamps: true })

const Notification = mongoose.model('Notification', NotificationSchema)

export default Notification