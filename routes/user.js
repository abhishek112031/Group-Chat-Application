const express=require('express');
const router=express.Router();
const userController=require('../controllers/user')

router.get('/signup',userController.getSignupPage);
router.post('/post-user-details',userController.postUserDetails);
router.get('/login',userController.getLoginPage);
router.post('/post-login-data',userController.postLoginDetails);


//chat window:
router.get('/user/chat',userController.getChatWindow)

module.exports=router;