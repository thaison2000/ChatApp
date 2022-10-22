import express from "express";
const app = express();

import bodyParser from "body-parser";
import dotenv from 'dotenv'
import { Request, Response } from "express";
import authRoute from "./routes/Auth";

dotenv.config()

// Middleswares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

//api
app.use('/api/auth',authRoute)


app.get('/test', (req: Request, res: Response) => {
    return res.send("RUN NOW!")
})

app.listen(process.env.PORT, () => console.log('Server running on port ' + process.env.PORT))