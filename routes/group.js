const express=require('express');
const router=express.Router();
const groupController=require('../controllers/group');
const userAuth=require('../middleware/auth');


router.get('/groups',groupController.getGroupPage);
router.get('/user-name',userAuth,groupController.getuserName);
router.post('/add-newGroup',userAuth,groupController.createNewGroup);
router.get('/user-groups',userAuth,groupController.userAllGroups);
router.get('/other-groups',userAuth,groupController.otherGroups);
router.get('/join-group/:Id',userAuth,groupController.joinGroup);
router.delete('/delete-group/:groupId',userAuth,groupController.deleteGroupByAdmin)


module.exports=router