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
const validation_1 = require("./validation");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const authController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userRegister = req.body;
            const { error } = (0, validation_1.registerValidation)({
                email: userRegister.email,
                name: userRegister.name,
                password: userRegister.password
            });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }
            if (req.body.password != req.body.againPassword) {
                return res.status(400).json('Password is not matching');
            }
            const emailExist = yield prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            });
            if (emailExist) {
                return res.status(400).json('Email already exist');
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(req.body.password, salt);
            const user = {
                email: req.body.email,
                name: req.body.name,
                password: hashedPassword,
                companyId: req.body.companyId,
                permission: req.body.permission
            };
            let newUser = yield prisma.user.create({
                data: {
                    email: req.body.email,
                    name: req.body.name,
                    password: hashedPassword,
                    companyId: req.body.companyId,
                    permission: req.body.permission
                }
            });
            res.status(200).json(newUser);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userLogin = req.body;
            // validate data before logged in
            const { error } = (0, validation_1.loginValidation)(userLogin);
            if (error) {
                return res.status(400).json(error.details[0].message);
            }
            // checking email exist or not
            const user = yield prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            });
            if (!user) {
                return res.status(400).json('Email is not found');
            }
            if (user.status == 'Locked') {
                return res.status(400).json('Your account is locked');
            }
            // checking password
            const validPass = yield bcrypt_1.default.compare(req.body.password, user.password);
            if (!validPass) {
                return res.status(400).json('Invalid password');
            }
            // Create and assign token
            const token = jsonwebtoken_1.default.sign({ userId: user.userId }, `${process.env.TOKEN_SECRET}`);
            res.status(200).json({
                userId: user.userId,
                name: user.name,
                email: user.email,
                phone: user.phone,
                dateOfBirth: user.dateOfBirth,
                address: user.address,
                gender: user.gender,
                avatar: user.avatar,
                companyId: user.companyId,
                status: user.status,
                jwt: token,
                permission: user.permission
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    changPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userExist = yield prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            });
            // checking code
            const code = yield prisma.code.findMany({
                where: {
                    userId: userExist === null || userExist === void 0 ? void 0 : userExist.userId,
                    code: parseInt(req.body.code)
                }
            });
            if (!code) {
                res.status(500).json('Wrong code');
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(req.body.newPassword, salt);
            const newUser = yield prisma.user.update({
                where: {
                    email: req.body.email
                },
                data: {
                    password: hashedPassword
                }
            });
            res.status(200).json('Change password successfully');
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    })
};
exports.default = authController;
//# sourceMappingURL=Auth.js.map