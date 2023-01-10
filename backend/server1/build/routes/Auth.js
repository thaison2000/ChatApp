"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("../controllers/Auth"));
const authRoute = express_1.default.Router();
authRoute.post('/register', Auth_1.default.register);
authRoute.post('/login', Auth_1.default.login);
exports.default = authRoute;
//# sourceMappingURL=Auth.js.map