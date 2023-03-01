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
exports.storage = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const Notification_1 = __importDefault(require("./routes/Notification"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const Post_1 = __importDefault(require("./routes/Post"));
const Comment_1 = __importDefault(require("./routes/Comment"));
const Like_1 = __importDefault(require("./routes/Like"));
const multer_1 = __importDefault(require("multer"));
const verifyToken_1 = __importDefault(require("./controllers/verifyToken"));
const Post_2 = __importDefault(require("./models/Post"));
const Comment_2 = __importDefault(require("./models/Comment"));
const DraftPost_1 = __importDefault(require("./models/DraftPost"));
dotenv_1.default.config();
mongoose_1.default.connect(`${process.env.DB_CONNECT}`, (err) => {
    if (!err)
        console.log('Connect to DB successfully!');
    else
        console.log('Connect error');
});
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
// Middleswares
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/docs", express_1.default.static("public/docs"));
//api
app.use('/api/notification', Notification_1.default);
app.use('/api/post', Post_1.default);
app.use('/api/comment', Comment_1.default);
app.use('/api/like', Like_1.default);
//upload image
exports.storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/docs");
    },
    filename: (req, file, cb) => {
        if (req.body.postId) {
            cb(null, req.user.userId + '-' + req.body.postId + '-' + file.originalname);
        }
        if (req.body.commentId) {
            cb(null, req.user.userId + '-' + req.body.commentId + '-' + file.originalname);
        }
    },
});
const upload = (0, multer_1.default)({ storage: exports.storage });
//upload document
app.post("/api/post/uploadDocs", verifyToken_1.default, upload.array("files", 10), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.type == 'draftPost') {
            const updatePost = yield DraftPost_1.default.findOne({
                userId: req.user.userId,
                draftPostId: req.body.postId
            });
            let fileNames = updatePost.fileNames;
            for (let i = 0; i < req.files.length; i++) {
                fileNames.push(req.user.userId + '-' + req.body.postId + '-' + req.files[i].originalname);
            }
            yield updatePost.updateOne({
                $set: {
                    fileNames: fileNames
                }
            });
        }
        else {
            const updatePost = yield Post_2.default.findOne({
                userId: req.user.userId,
                postId: req.body.postId
            });
            let fileNames = updatePost.fileNames;
            for (let i = 0; i < req.files.length; i++) {
                fileNames.push(req.user.userId + '-' + req.body.postId + '-' + req.files[i].originalname);
            }
            yield updatePost.updateOne({
                $set: {
                    fileNames: fileNames
                }
            });
        }
        res.status(200).json('Update post docs successfully !');
    }
    catch (error) {
        console.error(error);
    }
}));
app.post("/api/comment/uploadDocs", verifyToken_1.default, upload.array("files", 10), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateComment = yield Comment_2.default.findOne({
            userId: req.user.userId,
            commentId: req.body.commentId
        });
        let fileNames = [];
        for (let i = 0; i < req.files.length; i++) {
            fileNames.push(req.user.userId + '-' + req.body.commentId + '-' + req.files[i].originalname);
        }
        yield updateComment.updateOne({
            $set: {
                fileNames: fileNames
            }
        });
        res.status(200).json('Update post docs successfully !');
    }
    catch (error) {
        console.error(error);
    }
}));
app.get('/test', (req, res) => {
    return res.send("RUN NOW!");
});
app.listen(process.env.PORT, () => console.log('Server running on port ' + process.env.PORT));
//# sourceMappingURL=index.js.map