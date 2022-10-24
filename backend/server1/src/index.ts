import express from "express";
const app = express();

import bodyParser from "body-parser";
import dotenv from 'dotenv'
import { Request, Response } from "express";
import authRoute from "./routes/Auth";
import cors from "cors";
import userRoute from "./routes/User";
import multer from "multer";
import verifyToken from "./controllers/verifyToken";
import { PrismaClient } from "@prisma/client";

dotenv.config()

// Middleswares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use("/images", express.static("public/images"));

//api
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

//upload image
export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    },
});

const upload = multer({ storage: storage });

const prisma = new PrismaClient()

//update user avatar
app.post("/api/user/updateAvatar", verifyToken, upload.single("file"), async (req: any, res: Response) => {
    try {
        const userProfile = await prisma.user.update({
            where: {
                user_id: req.user.user_id
            },
            data: {
                email: undefined,
                name: undefined,
                password: undefined,
                phone: undefined,
                address: undefined,
                dateOfBirth: undefined,
                avatar: req.file?.originalname
            }
        })

        res.status(200).json(userProfile)
    } catch (error) {
        console.error(error);
    }
})

app.get('/test', (req: Request, res: Response) => {
    return res.send("RUN NOW!")
})

app.listen(process.env.PORT, () => console.log('Server running on port ' + process.env.PORT))