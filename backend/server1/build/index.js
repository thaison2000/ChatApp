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
exports.storage = exports.redisClient = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const Auth_1 = __importDefault(require("./routes/Auth"));
const cors_1 = __importDefault(require("cors"));
const User_1 = __importDefault(require("./routes/User"));
const multer_1 = __importDefault(require("multer"));
const verifyToken_1 = __importDefault(require("./controllers/verifyToken"));
const client_1 = require("@prisma/client");
const Group_1 = __importDefault(require("./routes/Group"));
const Friend_1 = __importDefault(require("./routes/Friend"));
const redis_1 = require("redis");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Company_1 = __importDefault(require("./routes/Company"));
const redisClient = (0, redis_1.createClient)({
    url: `${process.env.REDIS_URL}`,
});
exports.redisClient = redisClient;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.connect();
}))();
redisClient.on('connect', () => console.log('Redis Client Connected'));
redisClient.on('error', (err) => console.log('Redis Client Connection Error', err));
dotenv_1.default.config();
// Middleswares
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/images", express_1.default.static("public/images"));
//api
app.use('/api/auth', Auth_1.default);
app.use('/api/user', User_1.default);
app.use('/api/group', Group_1.default);
app.use('/api/friend', Friend_1.default);
app.use('/api/company', Company_1.default);
//upload image
exports.storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = (0, multer_1.default)({ storage: exports.storage });
const prisma = new client_1.PrismaClient();
//update user avatar
app.post("/api/user/updateAvatar", verifyToken_1.default, upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userProfile = yield prisma.user.update({
            where: {
                userId: req.user.userId
            },
            data: {
                avatar: req.body.name
            }
        });
        res.status(200).json('Update user avatar successfully !');
    }
    catch (error) {
        console.error(error);
    }
}));
app.post("/api/company/updateAvatar", verifyToken_1.default, upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyProfile = yield prisma.company.update({
            where: {
                companyId: parseInt(req.body.companyId)
            },
            data: {
                avatar: req.body.name
            }
        });
        res.status(200).json('Update company avatar successfully !');
    }
    catch (error) {
        console.error(error);
    }
}));
//update group avatar
app.post("/api/group/updateAvatar", verifyToken_1.default, upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield prisma.group.update({
            where: {
                groupId: parseInt(req.body.groupId)
            },
            data: {
                avatar: req.body.name
            }
        });
        const groupRedisKey = 'groups' + req.user.userId;
        let groups = yield redisClient.get(groupRedisKey);
        groups = JSON.parse(groups);
        groups.map((group) => {
            if (group.groupId == parseInt(req.body.groupId)) {
                group.avatar = req.body.name;
            }
        });
        yield redisClient.set(groupRedisKey, JSON.stringify(groups));
        res.status(200).json('Update group avatar successfully !');
    }
    catch (error) {
        console.error(error);
    }
}));
app.get('/test', (req, res) => {
    return res.send("RUN NOW!");
});
app.listen(process.env.PORT, () => {
    function addDemoData() {
        return __awaiter(this, void 0, void 0, function* () {
            //add demo company
            const companyExist = yield prisma.company.findUnique({
                where: {
                    companyId: 1
                }
            });
            if (!companyExist) {
                const company = {
                    name: 'company1'
                };
                let newCompany = yield prisma.company.create({
                    data: company
                });
            }
            // add demo user
            const userExist = yield prisma.user.findUnique({
                where: {
                    email: 'son.dt1408@gmail.com'
                }
            });
            if (userExist == null) {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash('son', salt);
                const user = {
                    email: 'son.dt1408@gmail.com',
                    name: 'son',
                    password: hashedPassword,
                    companyId: 1,
                };
                let newUser = yield prisma.user.create({
                    data: user
                });
            }
        });
    }
    addDemoData();
    console.log('Server running on port ' + process.env.PORT);
});
app.post("/api/user/sendCode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'son.dt1408@gmail.com',
                pass: 'fgigozjbyxxylpgr'
            }
        });
        const userExist = yield prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        if (!userExist) {
            return res.status(400).json('Email is not found');
        }
        if (userExist.status == 'Locked') {
            return res.status(400).json('Your account is locked');
        }
        if (userExist) {
            let code = Math.floor(Math.random() * 100000);
            let existCode = yield prisma.code.findMany({
                where: {
                    userId: userExist === null || userExist === void 0 ? void 0 : userExist.userId,
                }
            });
            if (existCode) {
                let newCode = yield prisma.code.updateMany({
                    where: {
                        userId: userExist.userId,
                    },
                    data: {
                        code: code
                    }
                });
            }
            else {
                let newCode = yield prisma.code.create({
                    data: {
                        userId: userExist.userId,
                        code: code
                    }
                });
            }
            var mailOptions = {
                from: 'son.dt1408@gmail.com',
                to: req.body.email,
                subject: 'Sending code to reset password',
                text: 'Here is your code to reset password: ' + code
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json('Send code successfully !');
                }
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
//# sourceMappingURL=index.js.map