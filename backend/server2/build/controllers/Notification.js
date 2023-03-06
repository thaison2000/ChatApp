"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
const Notification_1 = __importDefault(require("../models/Notification"));
//create a friend request notification
const notificationController = {
    createFriendRequestNotification: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newNotification = new Notification_1.default({
                notificationId: `${(0, uuidv4_1.uuid)()}${Date.now()}`,
                sendUserId: req.body.sendUserId,
                receiveUserId: req.body.receiveUserId,
                sendUserName: req.body.sendUserName,
                type: req.body.type,
            });
            yield newNotification.save();
            res.status(200).json('Create friend request notification successfully');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    createNotification: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newNotification = new Notification_1.default({
                notificationId: `${(0, uuidv4_1.uuid)()}${Date.now()}`,
                sendUserId: req.body.sendUserId,
                receiveUserId: req.body.receiveUserId,
                sendUserName: req.body.sendUserName,
                type: req.body.type,
                post: req.body.post,
                postId: req.body.postId,
                groupId: req.body.groupId,
                groupName: req.body.groupName,
                affectedUserName: req.body.affectedUserName
            });
            yield newNotification.save();
            console.log(newNotification);
            res.status(200).json('Create notification successfully');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    deletedNotification: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Notification_1.default.deleteMany({
                sendUserId: req.params.sendUserId,
                receiveUserId: req.params.receiveUserId,
                type: req.params.type
            });
            res.status(200).json('delete friend request successfully');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getNotification: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const notification = yield Notification_1.default.findOne({
                sendUserId: req.params.sendUserId,
                receiveUserId: req.params.receiveUserId,
                type: req.params.type
            });
            res.status(200).json(notification);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getAllNotificationsByReceiveUserId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let notifications = yield Notification_1.default.find({
                receiveUserId: req.user.userId,
            });
            res.status(200).json(notifications);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getAllNotificationsByGroupIds: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            let data = [];
            for (let i = 0; i < ((_a = req.body.groups) === null || _a === void 0 ? void 0 : _a.length); i++) {
                const notifications = yield Notification_1.default.find({
                    groupId: req.body.groups[i].groupId,
                });
                data = data.concat(notifications);
            }
            res.status(200).json(data);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    })
};
exports.default = notificationController;
//# sourceMappingURL=Notification.js.map