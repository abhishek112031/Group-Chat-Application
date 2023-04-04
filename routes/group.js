const express=require('express');
const router=express.Router();
const groupController=require('../controllers/group');
const userAuth=require('../middleware/auth');


router.get('/groups',groupController.getGroupPage);

module.exports=router