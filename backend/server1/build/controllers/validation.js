"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// Register validation
const registerValidation = (userRegister) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).required(),
        email: joi_1.default.string().min(6).required().email(),
        password: joi_1.default.string().min(3).required()
    });
    return schema.validate(userRegister);
};
exports.registerValidation = registerValidation;
// Login validation
const loginValidation = (userLogin) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(6).required().email(),
        password: joi_1.default.string().min(3).required()
    });
    return schema.validate(userLogin);
};
exports.loginValidation = loginValidation;
//# sourceMappingURL=validation.js.map