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
const companyController = {
    updateProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const companyProfileUpdate = req.body;
            const companyProfile = yield prisma.company.update({
                where: {
                    companyId: parseInt(req.body.companyId)
                },
                data: companyProfileUpdate
            });
            res.status(200).json(companyProfile);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const companyProfile = yield prisma.company.findUnique({
                where: {
                    companyId: parseInt(req.params.companyId)
                }
            });
            res.status(200).json(companyProfile);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield prisma.user.findMany({
                where: {
                    companyId: parseInt(req.params.companyId)
                }
            });
            console.log(users);
            res.status(200).json(users);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.delete({
                where: {
                    userId: parseInt(req.params.userId)
                }
            });
            res.status(200).json(user);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    lockUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.update({
                where: {
                    userId: req.body.userId
                },
                data: {
                    status: 'Locked'
                }
            });
            res.status(200).json(user);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    unLockUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.update({
                where: {
                    userId: req.body.userId
                },
                data: {
                    status: 'Unlocked'
                }
            });
            res.status(200).json(user);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
};
exports.default = companyController;
//# sourceMappingURL=Company.js.map