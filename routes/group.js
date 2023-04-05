const express=require('express');
const router=express.Router();
const groupController=require('../controllers/group');
const userAuth=require('../middleware/auth');


router.get('/groups',groupController.getGroupPage);
router.post('/add-newGroup',userAuth,groupController.createNewGroup);
router.get('/user-groups',userAuth,groupController.userAllGroups);
router.get('/all-groups',userAuth,groupController.allGroups)


module.exports=router