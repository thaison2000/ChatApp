"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Company_1 = __importDefault(require("../controllers/Company"));
const verifyToken_1 = __importDefault(require("../controllers/verifyToken"));
const companyRoute = express_1.default.Router();
companyRoute.put('/', verifyToken_1.default, Company_1.default.updateProfile);
companyRoute.get('/:companyId', verifyToken_1.default, Company_1.default.getProfile);
companyRoute.get('/users/:companyId', verifyToken_1.default, Company_1.default.getAllUsers);
companyRoute.delete('/user/:userId', verifyToken_1.default, Company_1.default.deleteUser);
companyRoute.post('/user/locked', verifyToken_1.default, Company_1.default.lockUser);
companyRoute.post('/user/unLocked', verifyToken_1.default, Company_1.default.unLockUser);
exports.default = companyRoute;
//# sourceMappingURL=Company.js.map