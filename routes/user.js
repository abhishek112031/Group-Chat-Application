const express=require('express');
const router=express.Router();
const userController=require('../controllers/user')

router.get('/signup',userController.getSignupPage)

module.exports=router;