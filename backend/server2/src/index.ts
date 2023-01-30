import express, { NextFunction } from "express";
const app = express();

import bodyParser from "body-parser";
import dotenv from 'dotenv'
import { Request, Response } from "express";
import notificationRoute from "./routes/Notification";
import cors from "cors";
import mongoose from "mongoose";
import postRoute from "./routes/Post";
import commentRoute from "./routes/Comment";
import likeRoute from "./routes/Like";
import multer from "multer";
import verifyToken from "./controllers/verifyToken";
import Post from "./models/Post";
import path from "path";
import Comment from "./models/Comment";

dotenv.config()

mongoose.connect(
    `${process.env.DB_CONNECT}`
    , (err: any) => {
        if (!err) console.log('Connect to DB successfully!')
        else console.log('Connect error')
    }
)

// Middleswares
app.use(function (req: Request, res: Response, next: NextFunction) {
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
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use("/docs", express.static("public/docs"));

//api
app.use('/api/notification', notificationRoute)
app.use('/api/post', postRoute)
app.use('/api/comment', commentRoute)
app.use('/api/like', likeRoute)

//upload image
export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/docs");
    },
    filename: (req: any, file, cb) => {
        if(req.body.postId){
            cb(null, req.user.userId + '-' + req.body.postId + '-' + file.originalname)

        }
        if(req.body.commentId){
            cb(null, req.user.userId + '-' + req.body.commentId + '-' + file.originalname)

        }
        },
});

const upload = multer({ storage: storage });

//upload document
app.post("/api/post/uploadDocs", verifyToken, upload.array("files",10), async (req: any, res: Response) => {
    try {
        
        const updatePost = await Post.findOne({
            userId: req.user.userId,
            postId: req.body.postId
        }
        );
        let fileNames = []
        for(let i=0;i< req.files.length;i++){
                fileNames.push(req.user.userId + '-' + req.body.postId + '-' +req.files[i].originalname)
        }
        await updatePost.updateOne({
            $set: {
                fileNames: fileNames
            }
        })

        res.status(200).json('Update post docs successfully !')
    } catch (error) {
        console.error(error);
    }
})

app.post("/api/comment/uploadDocs", verifyToken, upload.array("files",10), async (req: any, res: Response) => {
    try {
        
        const updateComment = await Comment.findOne({
            userId: req.user.userId,
            commentId: req.body.commentId
        }
        );
        let fileNames = []
        for(let i=0;i< req.files.length;i++){
            fileNames.push(req.user.userId + '-' + req.body.commentId + '-' +req.files[i].originalname)
        }
        await updateComment.updateOne({
            $set: {
                fileNames: fileNames
            }
        })
        res.status(200).json('Update post docs successfully !')
    } catch (error) {
        console.error(error);
    }
})

app.get('/test', (req: Request, res: Response) => {
    return res.send("RUN NOW!")
})

app.listen(process.env.PORT, () => console.log('Server running on port ' + process.env.PORT))