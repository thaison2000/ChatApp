"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Group_1 = __importDefault(require("../controllers/Group"));
const verifyToken_1 = __importDefault(require("../controllers/verifyToken"));
const groupRoute = express_1.default.Router();
groupRoute.post('/', verifyToken_1.default, Group_1.default.createGroup);
groupRoute.delete('/:groupId', verifyToken_1.default, Group_1.default.deleteGroup);
groupRoute.put('/name', verifyToken_1.default, Group_1.default.updateGroupName);
groupRoute.put('/desc', verifyToken_1.default, Group_1.default.updateGroupDesc);
groupRoute.post('/addMember/', verifyToken_1.default, Group_1.default.addMember);
groupRoute.delete('/deleteMember/:groupId/:userId', verifyToken_1.default, Group_1.default.deleteMember);
groupRoute.post('/promoteAdmin/', verifyToken_1.default, Group_1.default.promoteAdmin);
groupRoute.get('/', verifyToken_1.default, Group_1.default.getAllGroups);
groupRoute.get('/directMessage/', verifyToken_1.default, Group_1.default.getAllDirectMessageGroups);
groupRoute.get('/:groupId', verifyToken_1.default, Group_1.default.getGroupByGroupId);
groupRoute.get('/directMessage/:groupId', verifyToken_1.default, Group_1.default.getDirectMessageByGroupId);
groupRoute.get('/members/:groupId', verifyToken_1.default, Group_1.default.getAllGroupMemberByGroupId);
exports.default = groupRoute;
//# sourceMappingURL=Group.js.map