const express=require('express');
const router=express.Router();
const chatmsgController=require('../controllers/chatbox');
const userAuth=require('../middleware/auth')


//chat window:

router.get('/group/messages',chatmsgController.groupMessagePage);
router.get('/group/heading-data/:groupId',userAuth,chatmsgController.getHeadingData);

router.post('/user/message',userAuth,chatmsgController.postMessages);
// router.get('/user/all-messages',userAuth,chatmsgController.getChatMessages);

//trial part:
router.get('/user/new-messages',userAuth,chatmsgController.getNewMessages)

module.exports=router;