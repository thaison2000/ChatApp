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
const __1 = require("..");
const prisma = new client_1.PrismaClient();
const groupController = {
    createGroup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newGroup = yield prisma.group.create({
                data: {
                    name: req.body.name,
                    desc: req.body.desc,
                    type: req.body.type
                }
            });
            yield prisma.groupAdmin.create({
                data: {
                    groupId: newGroup.groupId,
                    userId: req.user.userId
                }
            });
            yield prisma.groupUser.create({
                data: {
                    groupId: newGroup.groupId,
                    userId: req.user.userId
                }
            });
            const groupRedisKey = 'groups' + req.user.userId;
            let groups = yield __1.redisClient.get(groupRedisKey);
            groups = JSON.parse(groups);
            groups.push(newGroup);
            yield __1.redisClient.set(groupRedisKey, JSON.stringify(groups));
            res.status(200).json('Create group successfully !');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    deleteGroup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const admin = yield prisma.groupAdmin.findMany({
                where: {
                    userId: req.user.userId,
                    groupId: parseInt(req.params.groupId)
                }
            });
            if (admin) {
                const deleteGroup = yield prisma.group.delete({
                    where: {
                        groupId: parseInt(req.params.groupId)
                    }
                });
                yield prisma.groupAdmin.deleteMany({
                    where: {
                        groupId: parseInt(req.params.groupId)
                    }
                });
                yield prisma.groupUser.deleteMany({
                    where: {
                        groupId: parseInt(req.params.groupId)
                    }
                });
                const groupRedisKey = 'groups' + req.user.userId;
                let groups = yield __1.redisClient.get(groupRedisKey);
                groups = JSON.parse(groups);
                groups = groups.filter((group) => group.groupId != deleteGroup.groupId);
                yield __1.redisClient.set(groupRedisKey, JSON.stringify(groups));
            }
            res.status(200).json('Delete group successfully !');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    updateGroupName: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.group.update({
                where: {
                    groupId: req.body.groupId
                },
                data: {
                    name: req.body.name,
                }
            });
            const groupUsers = yield prisma.groupUser.findMany({
                where: {
                    groupId: parseInt(req.body.groupId)
                }
            });
            for (let i = 0; i < groupUsers.length; i++) {
                const groupRedisKey = 'groups' + groupUsers[i].userId;
                let groups = yield __1.redisClient.get(groupRedisKey);
                groups = JSON.parse(groups);
                groups.map((group) => {
                    if (group.groupId == parseInt(req.body.groupId)) {
                        group.name = req.body.name;
                    }
                });
                yield __1.redisClient.set(groupRedisKey, JSON.stringify(groups));
            }
            res.status(200).json('Update group name successfully !');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    updateGroupDesc: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.group.update({
                where: {
                    groupId: req.body.groupId
                },
                data: {
                    desc: req.body.desc,
                }
            });
            const groupUsers = yield prisma.groupUser.findMany({
                where: {
                    groupId: parseInt(req.body.groupId)
                }
            });
            for (let i = 0; i < groupUsers.length; i++) {
                const groupRedisKey = 'groups' + groupUsers[i].userId;
                let groups = yield __1.redisClient.get(groupRedisKey);
                groups = JSON.parse(groups);
                groups.map((group) => {
                    if (group.groupId == parseInt(req.body.groupId)) {
                        group.desc = req.body.desc;
                    }
                });
                yield __1.redisClient.set(groupRedisKey, JSON.stringify(groups));
            }
            res.status(200).json('Update group desc successfully !');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    addMember: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.groupUser.create({
                data: {
                    groupId: parseInt(req.body.groupId),
                    userId: parseInt(req.body.userId)
                }
            });
            let group = yield prisma.group.findUnique({
                where: {
                    groupId: parseInt(req.body.groupId)
                }
            });
            const groupRedisKey = 'groups' + req.body.userId;
            let groups = yield __1.redisClient.get(groupRedisKey);
            groups = JSON.parse(groups);
            let data = [];
            if (groups) {
                groups.push(group);
            }
            else {
                data.push(groups);
            }
            yield __1.redisClient.set(groupRedisKey, JSON.stringify(data));
            res.status(200).json('Add member into group successfully !');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    //chi xoa duoc user, khong xoa duoc admin
    deleteMember: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.groupUser.deleteMany({
                where: {
                    groupId: parseInt(req.params.groupId),
                    userId: parseInt(req.params.userId)
                }
            });
            const groupRedisKey = 'groups' + req.params.userId;
            let groups = yield __1.redisClient.get(groupRedisKey);
            groups = JSON.parse(groups);
            groups = groups.filter((group) => group.groupId != req.params.groupId);
            yield __1.redisClient.set(groupRedisKey, JSON.stringify(groups));
            res.status(200).json('Delete member in group successfully !');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    promoteAdmin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.groupAdmin.create({
                data: {
                    groupId: parseInt(req.body.groupId),
                    userId: parseInt(req.body.userId)
                }
            });
            res.status(200).json('Promote member to admin in group successfully !');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getAllGroups: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const groupRedisKey = 'groups' + req.user.userId;
            let groups = yield __1.redisClient.get(groupRedisKey);
            // If that key exists in Redis store
            if (((_a = JSON.parse(groups)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                return res.status(200).json(JSON.parse(groups));
            }
            else {
                let data = [];
                const groupUsers = yield prisma.groupUser.findMany({
                    where: {
                        userId: req.user.userId
                    }
                });
                for (let i = 0; i < groupUsers.length; i++) {
                    const group = yield prisma.group.findUnique({
                        where: {
                            groupId: groupUsers[i].groupId
                        }
                    });
                    if ((group === null || group === void 0 ? void 0 : group.type) == 'Chanel') {
                        data.push(group);
                    }
                }
                yield __1.redisClient.set(groupRedisKey, JSON.stringify(data));
                res.status(200).json(data);
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getAllDirectMessageGroups: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let data = [];
            const groupUsers = yield prisma.groupUser.findMany({
                where: {
                    userId: req.user.userId
                }
            });
            for (let i = 0; i < groupUsers.length; i++) {
                const group = yield prisma.group.findUnique({
                    where: {
                        groupId: groupUsers[i].groupId
                    }
                });
                if ((group === null || group === void 0 ? void 0 : group.type) == 'DirectMessage') {
                    let groupAnotherUser = yield prisma.groupUser.findMany({
                        where: {
                            groupId: group.groupId
                        }
                    });
                    groupAnotherUser = groupAnotherUser.filter((groupAnotherUser) => {
                        return groupAnotherUser.userId != req.user.userId;
                    });
                    let user;
                    for (let i = 0; i < groupAnotherUser.length; i++) {
                        user = yield prisma.user.findUnique({
                            where: {
                                userId: groupAnotherUser[0].userId
                            }
                        });
                    }
                    data.push({
                        groupId: group.groupId,
                        name: user === null || user === void 0 ? void 0 : user.name,
                        avatar: user === null || user === void 0 ? void 0 : user.avatar,
                        userId: user === null || user === void 0 ? void 0 : user.userId
                    });
                }
            }
            res.status(200).json(data);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getGroupByGroupId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let group = yield prisma.group.findUnique({
                where: {
                    groupId: parseInt(req.params.groupId)
                }
            });
            if ((group === null || group === void 0 ? void 0 : group.type) == 'DirectMessage') {
                let groupAnotherUser = yield prisma.groupUser.findMany({
                    where: {
                        groupId: group.groupId
                    }
                });
                groupAnotherUser = groupAnotherUser.filter((groupAnotherUser) => {
                    return groupAnotherUser.userId != req.user.userId;
                });
                let user;
                for (let i = 0; i < groupAnotherUser.length; i++) {
                    user = yield prisma.user.findUnique({
                        where: {
                            userId: groupAnotherUser[0].userId
                        }
                    });
                }
                group = {
                    groupId: group.groupId,
                    name: (user === null || user === void 0 ? void 0 : user.name) || '',
                    avatar: (user === null || user === void 0 ? void 0 : user.avatar) || '',
                    desc: '',
                    type: 'DirectMessage'
                };
            }
            res.status(200).json(group);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getDirectMessageByGroupId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const group = yield prisma.group.findUnique({
                where: {
                    groupId: parseInt(req.params.groupId)
                }
            });
            if (group) {
                let groupAnotherUser = yield prisma.groupUser.findMany({
                    where: {
                        groupId: group.groupId
                    }
                });
                groupAnotherUser = groupAnotherUser.filter((groupAnotherUser) => {
                    return groupAnotherUser.userId != req.user.userId;
                });
                let user;
                for (let i = 0; i < groupAnotherUser.length; i++) {
                    user = yield prisma.user.findUnique({
                        where: {
                            userId: groupAnotherUser[0].userId
                        }
                    });
                }
                return res.status(200).json({
                    groupId: group.groupId,
                    name: user === null || user === void 0 ? void 0 : user.name,
                    avatar: user === null || user === void 0 ? void 0 : user.avatar,
                    userId: user === null || user === void 0 ? void 0 : user.userId
                });
            }
            else {
                return res.status(200).json([]);
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getAllGroupMemberByGroupId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let data = [];
            const groupMembers = yield prisma.groupUser.findMany({
                where: {
                    groupId: parseInt(req.params.groupId)
                }
            });
            for (let i = 0; i < groupMembers.length; i++) {
                //lay thong tin user
                const user = yield prisma.user.findUnique({
                    where: {
                        userId: groupMembers[i].userId
                    }
                });
                //kiem tra co phai admin khong
                const admin = yield prisma.groupAdmin.findMany({
                    where: {
                        groupId: groupMembers[i].groupId,
                        userId: groupMembers[i].userId
                    }
                });
                if (admin.length == 0) {
                    data.push({
                        userId: user === null || user === void 0 ? void 0 : user.userId,
                        groupId: groupMembers[i].groupId,
                        name: user === null || user === void 0 ? void 0 : user.name,
                        avatar: user === null || user === void 0 ? void 0 : user.avatar,
                        type: 'user'
                    });
                }
                else {
                    data.push({
                        userId: user === null || user === void 0 ? void 0 : user.userId,
                        groupId: groupMembers[i].groupId,
                        name: user === null || user === void 0 ? void 0 : user.name,
                        avatar: user === null || user === void 0 ? void 0 : user.avatar,
                        type: 'admin'
                    });
                }
            }
            res.status(200).json(data);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
};
exports.default = groupController;
//# sourceMappingURL=Group.js.map