import express from "express";
import userController from "../controllers/User";
import verifyToken from "../controllers/verifyToken";

const userRoute = express.Router()

userRoute.post('/updateProfile',verifyToken,userController.updateProfile)


export default userRoute