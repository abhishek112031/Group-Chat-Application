const path=require('path');
const Group=require('../models/group');
const User_Group=require('../models/usergroup');

const {Sequelize, Op} = require('sequelize');

exports.getGroupPage=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','group.html'));
}

exports.createNewGroup= async (req,res,next)=>{
    try{


        const {newGroup}=req.body;
    
        const userNewGroup= await req.user.createGroup({nameOfGroup:newGroup},{through: {isAdmin : true}});
        console.log("===>",userNewGroup);
    
        return res.status(201).json({ nameOfGroup: userNewGroup.nameOfGroup ,id:userNewGroup.id});
    }
    catch(err){
        return res.status(500).json({success : false, message: 'Something went wrong !'});
    }


};


//trialing
exports.userAllGroups=async (req,res,next)=>{

    const arrayOfGroups = await req.user.getGroups({
        attributes : ["id" , "nameOfGroup"]
    });

    res.status(200).json(arrayOfGroups);

};

exports.allGroups=async(req,res,next)=>{

    const otherGroups=await Group.findAll({
        attributes : ["id" , "nameOfGroup"]
    });
    console.log("otherGrp-->",otherGroups)
    res.status(200).json(otherGroups);

}