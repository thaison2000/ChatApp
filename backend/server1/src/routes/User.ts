import express from "express";
import userController from "../controllers/User";
import verifyToken from "../controllers/verifyToken";

const userRoute = express.Router()

userRoute.post('/updateProfile',verifyToken,userController.updateProfile)
userRoute.get('/:user_id',verifyToken,userController.getProfile)


export default userRoute