import express, { NextFunction } from "express";
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
import groupRoute from "./routes/Group";
import friendRoute from "./routes/Friend";
import { createClient } from "redis";
import bcrypt from 'bcrypt'
import companyRoute from "./routes/company";

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

(async () => {
    await redisClient.connect();
})();


redisClient.on('connect', () => console.log('Redis Client Connected'));
redisClient.on('error', (err) => console.log('Redis Client Connection Error', err));

export { redisClient };


dotenv.config()


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

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use("/images", express.static("public/images"));

//api
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/group', groupRoute)
app.use('/api/friend', friendRoute)
app.use('/api/company', companyRoute)

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
                userId: req.user.userId
            },
            data: {
                avatar: req.body.name
            }
        })

        res.status(200).json('Update user avatar successfully !')
    } catch (error) {
        console.error(error);
    }
})

app.post("/api/company/updateAvatar", verifyToken, upload.single("file"), async (req: any, res: Response) => {
    try {
        const companyProfile = await prisma.company.update({
            where: {
                companyId: parseInt(req.body.companyId)
            },
            data: {
                avatar: req.body.name
            }
        })

        res.status(200).json('Update company avatar successfully !')
    } catch (error) {
        console.error(error);
    }
})

//update group avatar
app.post("/api/group/updateAvatar", verifyToken, upload.single("file"), async (req: any, res: Response) => {
    try {
        const group = await prisma.group.update({
            where: {
                groupId: parseInt(req.body.groupId)
            },
            data: {
                avatar: req.body.name
            }
        })

        const groupRedisKey = 'groups' + req.user.userId
        let groups: any = await redisClient.get(groupRedisKey)
        groups = JSON.parse(groups)
        groups.map((group: any) => {
            if (group.groupId == parseInt(req.body.groupId)) {
                group.avatar = req.body.name
            }
        })
        await redisClient.set(groupRedisKey, JSON.stringify(groups));

        res.status(200).json('Update group avatar successfully !')
    } catch (error) {
        console.error(error);
    }
})

app.get('/test', (req: Request, res: Response) => {
    return res.send("RUN NOW!")
})

app.listen(process.env.PORT, () => {
    async function addDemoData() {
        //add demo company
        const companyExist = await prisma.company.findUnique({
            where: {
                companyId: 1
            }
        })
        if (!companyExist) {
            const company = {
                name: 'company1'

            }
            let newCompany = await prisma.company.create({
                data: company
            })
        }

        // add demo user
        const userExist = await prisma.user.findUnique({
            where: {
                email: 'user1@gmail.com'
            }
        })
        if (userExist == null) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash('user1', salt)
            const user = {
                email: 'user1@gmail.com',
                name: 'user1',
                password: hashedPassword,
                companyId: 1,
            }
            let newUser = await prisma.user.create({
                data: user
            })
        }

    }

    addDemoData()
    console.log('Server running on port ' + process.env.PORT)
})

