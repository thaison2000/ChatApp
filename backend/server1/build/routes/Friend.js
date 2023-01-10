"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Friend_1 = __importDefault(require("../controllers/Friend"));
const verifyToken_1 = __importDefault(require("../controllers/verifyToken"));
const friendRoute = express_1.default.Router();
friendRoute.post('/request/', verifyToken_1.default, Friend_1.default.createFriendRequest);
friendRoute.delete('/request/:sendUserId/:receiveUserId', verifyToken_1.default, Friend_1.default.deleteFriendRequest);
friendRoute.get('/request/sendUser/', verifyToken_1.default, Friend_1.default.getAllFriendRequestBySendUserId);
friendRoute.get('/request/receiveUser/', verifyToken_1.default, Friend_1.default.getAllFriendRequestByReceiveUserId);
friendRoute.post('/', verifyToken_1.default, Friend_1.default.addFriend);
friendRoute.delete('/:friendId', verifyToken_1.default, Friend_1.default.deleteFriend);
friendRoute.get('/', verifyToken_1.default, Friend_1.default.getAllFriends);
exports.default = friendRoute;
//# sourceMappingURL=Friend.js.map