import express from "express";
const app = express();

import bodyParser from "body-parser";
import dotenv from 'dotenv'
import { Request, Response } from "express";
import notificationRoute from "./routes/Notification";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config()

mongoose.connect(
    `${process.env.DB_CONNECT}`
    , (err: any) => {
        if (!err) console.log('Connect to DB successfully!')
        else console.log('Connect error')
    }
)

// Middleswares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use("/images", express.static("public/images"));

//api
app.use('/api/notification', notificationRoute)

app.get('/test', (req: Request, res: Response) => {
    return res.send("RUN NOW!")
})

app.listen(process.env.PORT, () => console.log('Server running on port ' + process.env.PORT))