const express=require('express');
const router=express.Router();
const chatmsgController=require('../controllers/chatbox');
const userAuth=require('../middleware/auth')


//chat window:
router.get('/user/chat',chatmsgController.getChatWindow);
router.post('/user/message',userAuth,chatmsgController.postChatMessage);
router.get('/user/all-messages',userAuth,chatmsgController.getChatMessages);

module.exports=router;