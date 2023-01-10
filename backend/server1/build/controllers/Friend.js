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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const FriendController = {
    createFriendRequest: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const friendRequest = {
                sendUserId: req.user.userId,
                receiveUserId: req.body.receiveUserId
            };
            yield prisma.friendRequest.create({
                data: friendRequest
            });
            res.status(200).json("Create friend request successfully !");
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    deleteFriendRequest: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.friendRequest.deleteMany({
                where: {
                    sendUserId: parseInt(req.params.sendUserId),
                    receiveUserId: parseInt(req.params.receiveUserId)
                }
            });
            res.status(200).json("Delete friend request successfully !");
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getAllFriendRequestBySendUserId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const FriendRequests = yield prisma.friendRequest.findMany({
                where: {
                    sendUserId: req.user.userId
                }
            });
            res.status(200).json(FriendRequests);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }),
    getAllFriendRequestByReceiveUserId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const FriendRequests = yield prisma.friendRequest.findMany({
                where: {
                    receiveUserId: req.user.userId
                }
            });
            res.status(200).json(FriendRequests);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }),
    addFriend: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.friend.create({
                data: {
                    userId: req.user.userId,
                    friendId: parseInt(req.body.friendId)
                }
            });
            yield prisma.friend.create({
                data: {
                    userId: parseInt(req.body.friendId),
                    friendId: req.user.userId,
                }
            });
            const newGroup = yield prisma.group.create({
                data: {
                    name: '',
                    desc: '',
                    type: 'DirectMessage'
                }
            });
            yield prisma.groupUser.create({
                data: {
                    groupId: newGroup.groupId,
                    userId: parseInt(req.user.userId)
                }
            });
            yield prisma.groupUser.create({
                data: {
                    groupId: newGroup.groupId,
                    userId: parseInt(req.body.friendId)
                }
            });
            res.status(200).json('Add friend successfully !');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    deleteFriend: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.friend.deleteMany({
                where: {
                    userId: req.user.userId,
                    friendId: parseInt(req.params.friendId)
                }
            });
            yield prisma.friend.deleteMany({
                where: {
                    friendId: req.user.userId,
                    userId: parseInt(req.params.friendId)
                }
            });
            const groupUser1 = yield prisma.groupUser.findMany({
                where: {
                    userId: req.user.userId
                }
            });
            const groupUser2 = yield prisma.groupUser.findMany({
                where: {
                    userId: parseInt(req.params.friendId)
                }
            });
            for (let i = 0; i < groupUser1.length; i++) {
                for (let j = 0; j < groupUser2.length; j++) {
                    const group = yield prisma.group.findUnique({
                        where: {
                            groupId: groupUser1[i].groupId
                        }
                    });
                    if (groupUser1[i].groupId == groupUser2[j].groupId && (group === null || group === void 0 ? void 0 : group.type) == 'DirectMessage') {
                        yield prisma.group.delete({
                            where: {
                                groupId: groupUser1[i].groupId
                            }
                        });
                        yield prisma.groupUser.deleteMany({
                            where: {
                                groupId: groupUser1[i].groupId,
                                userId: req.user.userId
                            }
                        });
                        yield prisma.groupUser.deleteMany({
                            where: {
                                groupId: groupUser1[i].groupId,
                                userId: parseInt(req.params.friendId)
                            }
                        });
                    }
                }
            }
            res.status(200).json('Delete friend successfully !');
        }
        catch (err) {
            res.status(500).json(err);
        }
    }),
    getAllFriends: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const friends = yield prisma.friend.findMany({
                where: {
                    userId: req.user.userId,
                }
            });
            res.status(200).json(friends);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }),
};
exports.default = FriendController;
//# sourceMappingURL=Friend.js.map