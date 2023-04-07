const path = require('path');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

//models:
const User = require('../models/user');
const Message=require('../models/chatbox');
const Group=require('../models/group');
const User_Group=require('../models/usergroup')

// const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

//chat window:
exports.groupMessagePage=async(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','chatFrontend.html'));
};
exports.getHeadingData=async (req,res,next)=>{
    try{
        const {groupId}=req.params;
        const groupDetails=await Group.findByPk(groupId);
        const groupName=groupDetails.nameOfGroup;
        res.status(200).json({groupName:groupName,userName:req.user.name})

    }
    catch(err){
        console.log('heading err:-->',err);

    }
}

// exports.postChatMessage=(req,res,next)=>{
//     const message=req.body.message;
//     console.log(req.user);
//     // console.log(typeof(message));
//     bcrypt.hash(message, 10, async (err, hash) => {
//         try {

//            const msg=await Message.create({

//                 message: hash,
//                 userId:req.user.id
//             });
//             // console.log(msg)
//             res.status(201).json({ message: 'successfull', success: true })
//         }
//         catch (err) {
//             // console.log(err)
//             res.status(500).json({ message: "something went wrong", success: false });

//         }

//     })
    
// }

// exports.postChatMessage= async (req,res,next)=>{
//     try{

//         const message=req.body.message;
//         // console.log(req.user);
//         const msg=await Message.create({
    
//              message: message,
//              userId:req.user.id,
//              name:req.user.name
//          });
//         //  console.log(msg.id);
//          res.status(201).json({ message: msg,name:req.user.name, success: true });
//     }
//     // console.log(typeof(message));
//     catch(err){
//         res.status(500).json({ message: "something went wrong", success: false });
//     }
    
// };
// exports.getChatMessages=async(req,res,next)=>{

//     try{
//         const userMessageArr=await Message.findAll();
//         console.log("***",userMessageArr);
//         // res.status(200).json({message:userMessageArr,admin:req.user.name});//all msg
//         res.status(200).json({admin:req.user.name});//all msg

        
//         // res.status(200).json({message:userMessageArr.slice(userMessageArr.length-15,userMessageArr.length),admin:req.user.name});//only last 15 msg

//     }
//     catch(err){
//         console.log("err-->",err);
//         res.status(500).json({ message: "something went wrong", success: false });

//     }

// }
// // query for new message only:--> 
// exports.getNewMessages=async (req,res,next)=>{
//     try{

//         let Id=req.query.id;
//         // console.log("id===",id);
    
//         let newmsg=await Message.findAll({where: {
//             id: {
//               [Op.gt]: Id // use the "greater than" operator to compare the "id" column to Id
//             }
//           }
//         });
//         // console.log("newmsg==>",newmsg);
//         res.status(200).json(newmsg);
//     }
//     catch(err){
//         res.status(500).json({ message: "something went wrong", success: false });

//     }

// }

//group related:-->
// exports.getOtherMembers=async(req,res,next)=>{
//     try{
//         const {groupId}=req.params;
//         // const currentUser=await User.findByPk(req.user.id);
//         // const currentGroup= await Group.findByPk(groupId);
//         const membersOfCurrGroup=await User_Group.findAll({where:{groupId:groupId,isAdmin:false}});
//         // console.log("group members with same groupId",membersOfCurrGroup);
//         const userIdsArr=[];
//         membersOfCurrGroup.forEach((elem)=>{
//             userIdsArr.push(elem.userId);
//         });
//         // res.status(200).json(membersOfCurrGroup);

//         const memberDetails=await User.findAll({
//             where:{
//                 id:userIdsArr
//             },
//             attributes:['id','name']
//         });
//         res.status(200).json(memberDetails);
//         // console.log('useridar-->',userIdsArr)


//     }
//     catch(err){
//         console.log("err-->",err)
//     }


// };
// exports.getAdmins=async (req,res,next)=>{
//     try{
//         const {Id}=req.params;
//         // console.log("id--",Id);
//         const admin=await  User_Group.findAll({where:{groupId:Id,isAdmin:true}});
//         const admiIdArr=[];
//         admin.forEach((elem)=>{
//             admiIdArr.push(elem.userId);
//         });

//         const adminDetails=await User.findAll({
//             where:{
//                 id:admiIdArr
//             },
//             attributes:['id','name']
//         });
//         res.status(200).json(adminDetails);


//     }
//     catch(err){
//         console.log("err==>>",err);
//     }


// }