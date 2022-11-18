import express from "express";
import groupController from "../controllers/Group";
import verifyToken from "../controllers/verifyToken";

const groupRoute = express.Router()

groupRoute.post('/',verifyToken,groupController.createGroup)
groupRoute.delete('/:groupId',verifyToken,groupController.deleteGroup)
groupRoute.put('/',verifyToken,groupController.updateGroup)
groupRoute.post('/addMember/',verifyToken,groupController.addMember)
groupRoute.delete('/deleteMember/:groupId/:userId',verifyToken,groupController.deleteMember)
groupRoute.post('/promoteAdmin/',verifyToken,groupController.promoteAdmin)
groupRoute.get('/',verifyToken,groupController.getAllGroups)
groupRoute.get('/directMessage/',verifyToken,groupController.getAllDirectMessageGroups)
groupRoute.get('/:groupId',verifyToken,groupController.getGroupByGroupId)
groupRoute.get('/members/:groupId',verifyToken,groupController.getAllGroupMemberByGroupId)

export default groupRoute