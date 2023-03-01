import express from "express";
import authController from "../controllers/Auth";
import verifyToken from "../controllers/verifyToken";

const authRoute = express.Router()

authRoute.post('/register',authController.register)
authRoute.post('/login',authController.login)
authRoute.post('/changePassword',authController.changPassword)

export default authRoute