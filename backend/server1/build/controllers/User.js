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
const userController = {
    updateProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userProfileUpdate = req.body;
            const userProfile = yield prisma.user.update({
                where: {
                    userId: req.user.userId
                },
                data: userProfileUpdate
            });
            res.status(200).json(userProfile);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    getProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userProfile = yield prisma.user.findUnique({
                where: {
                    userId: parseInt(req.params.userId)
                }
            });
            res.status(200).json(userProfile);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    findUserByName: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield prisma.user.findMany({
                where: {
                    name: {
                        contains: req.query.name,
                    }
                }
            });
            console.log(users);
            res.status(200).json(users);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    })
};
exports.default = userController;
//# sourceMappingURL=User.js.map