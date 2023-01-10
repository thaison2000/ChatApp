"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../controllers/User"));
const verifyToken_1 = __importDefault(require("../controllers/verifyToken"));
const userRoute = express_1.default.Router();
userRoute.put('/', verifyToken_1.default, User_1.default.updateProfile);
userRoute.get('/:userId', verifyToken_1.default, User_1.default.getProfile);
userRoute.get('/', verifyToken_1.default, User_1.default.findUserByName);
exports.default = userRoute;
//# sourceMappingURL=User.js.map