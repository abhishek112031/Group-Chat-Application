const express=require('express');
const router=express.Router();
const chatmsgController=require('../controllers/chatbox');
const userAuth=require('../middleware/auth')


//chat window:

router.get('/group/messages',chatmsgController.groupMessagePage);
router.get('/group/heading-data/:groupId',userAuth,chatmsgController.getHeadingData);



// router.get('/userGroup/members/:groupId',userAuth,chatmsgController.getOtherMembers);
// router.get('/group-admins/:Id',userAuth,chatmsgController.getAdmins)

// router.post('/user/message',userAuth,chatmsgController.postChatMessage);
// router.get('/user/all-messages',userAuth,chatmsgController.getChatMessages);

module.exports=router;