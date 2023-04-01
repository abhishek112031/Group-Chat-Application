const path = require('path');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const User = require('../models/user');
const Message=require('../models/chatbox')

// const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

//chat window:
exports.getChatWindow=(req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname, "..", "views", "chatFrontend.html"));
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

exports.postChatMessage= async (req,res,next)=>{
    try{

        const message=req.body.message;
        // console.log(req.user);
        const msg=await Message.create({
    
             message: message,
             userId:req.user.id,
             name:req.user.name
         });
        //  console.log(msg.id);
         res.status(201).json({ message: msg,name:req.user.name, success: true });
    }
    // console.log(typeof(message));
    catch(err){
        res.status(500).json({ message: "something went wrong", success: false });
    }
    
};
exports.getChatMessages=async(req,res,next)=>{

    try{
        const userMessageArr=await Message.findAll();
        // console.log(userMessageArr);
        // res.status(200).json({message:userMessageArr,admin:req.user.name});//all msg
        res.status(200).json({admin:req.user.name});//all msg

        
        // res.status(200).json({message:userMessageArr.slice(userMessageArr.length-15,userMessageArr.length),admin:req.user.name});//only last 15 msg

    }
    catch(err){
        console.log("err-->",err);
        res.status(500).json({ message: "something went wrong", success: false });

    }

}
// query for new message only:--> 
exports.getNewMessages=async (req,res,next)=>{
    try{

        let Id=req.query.id;
        // console.log("id===",id);
    
        let newmsg=await Message.findAll({where: {
            id: {
              [Op.gt]: Id // use the "greater than" operator to compare the "id" column to Id
            }
          }
        });
        // console.log("newmsg==>",newmsg);
        res.status(200).json(newmsg);
    }
    catch(err){
        res.status(500).json({ message: "something went wrong", success: false });

    }

}