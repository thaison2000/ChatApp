"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Notification_1 = __importDefault(require("../controllers/Notification"));
const verifyToken_1 = __importDefault(require("../controllers/verifyToken"));
const notificationRoute = express_1.default.Router();
notificationRoute.post('/friendRequest/', verifyToken_1.default, Notification_1.default.createFriendRequestNotification);
notificationRoute.post('/', verifyToken_1.default, Notification_1.default.createNotification);
notificationRoute.delete('/:sendUserId/:receiveUserId/:type', verifyToken_1.default, Notification_1.default.deletedNotification);
notificationRoute.get('/:sendUserId/:receiveUserId/:type', verifyToken_1.default, Notification_1.default.getNotification);
notificationRoute.get('/', verifyToken_1.default, Notification_1.default.getAllNotificationsByReceiveUserId);
notificationRoute.post('/groups/', verifyToken_1.default, Notification_1.default.getAllNotificationsByGroupIds);
exports.default = notificationRoute;
//# sourceMappingURL=Notification.js.map