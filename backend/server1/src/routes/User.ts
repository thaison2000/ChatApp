import express from "express";
import userController from "../controllers/User";
import verifyToken from "../controllers/verifyToken";

const userRoute = express.Router()

userRoute.put('/updateProfile',verifyToken,userController.updateProfile)
userRoute.get('/:userId',verifyToken,userController.getProfile)
userRoute.get('/',verifyToken,userController.findUserByName)


export default userRoute