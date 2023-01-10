"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
app.use("/images", express_1.default.static("public/images"));
//api
app.use('/api/notification', Notification_1.default);
app.use('/api/post', Post_1.default);
app.use('/api/comment', Comment_1.default);
app.use('/api/like', Like_1.default);
app.get('/test', (req, res) => {
    return res.send("RUN NOW!");
});
app.listen(process.env.PORT, () => console.log('Server running on port ' + process.env.PORT));
//# sourceMappingURL=index.js.map