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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json())
app.use(cors())
app.use("/images", express.static("public/images"));

//api
app.use('/api/notification', notificationRoute)
app.use('/api/post', postRoute)
app.use('/api/comment', commentRoute)
app.use('/api/like', likeRoute)

app.get('/test', (req: Request, res: Response) => {
    return res.send("RUN NOW!")
})

app.listen(process.env.PORT, () => console.log('Server running on port ' + process.env.PORT))