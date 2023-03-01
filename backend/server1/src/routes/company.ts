import express from "express";
import companyController from "../controllers/Company";
import verifyToken from "../controllers/verifyToken";

const companyRoute = express.Router()

companyRoute.put('/',verifyToken,companyController.updateProfile)
companyRoute.get('/:companyId',verifyToken,companyController.getProfile)
companyRoute.get('/users/:companyId',verifyToken,companyController.getAllUsers)
companyRoute.delete('/user/:userId',verifyToken,companyController.deleteUser)
companyRoute.post('/user/locked',verifyToken,companyController.lockUser)
companyRoute.post('/user/unLocked',verifyToken,companyController.unLockUser)


export default companyRoute