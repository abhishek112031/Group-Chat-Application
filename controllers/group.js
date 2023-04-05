const path=require('path');
const Group=require('../models/group');
const User_Group=require('../models/usergroup');

const {Op} = require('sequelize');

exports.getGroupPage=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','group.html'));
}

exports.createNewGroup= async (req,res,next)=>{
    try{


        const {newGroup}=req.body;
    
        const userNewGroup= await req.user.createGroup({nameOfGroup:newGroup},{through: {isAdmin : true}});
        // console.log("===>",userNewGroup);
    
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

    // console.log("user group===",arrayOfGroups)

    res.status(200).json(arrayOfGroups);

};

// exports.allGroups=async(req,res,next)=>{

//     const otherGroups=await Group.findAll({
//         attributes : ["id" , "nameOfGroup"]
//     });
//     // console.log("otherGrp-->",otherGroups)
    
//     res.status(200).json(otherGroups);

// };

exports.otherGroups=async(req,res,next)=>{
    try{

        const userGroup=await req.user.getGroups();
        let groupIds=[];
        userGroup.forEach(element => {
            groupIds.push(element.id)
            
        });
        console.log("groupid==",groupIds)
        // const allOtherGroups=await Group.findAll();
    
        const otherGroups=await Group.findAll({
            where:{
                id:{
                    [Op.notIn]:groupIds
                }
            }
    
    
        });
        res.status(200).json(otherGroups);
    }
    catch(err){
        console.log("err--->",err)
    }



    
    // res.status(200).json(otherGroups);

};

exports.joinGroup=async(req,res,next)=>{
    const groupid=req.params.Id;

    const userGroupUpdate=await User_Group.create({
        userId:req.user.id,
        groupId:groupid,
        isAdmin:false
    });
    const group=await Group.findByPk(groupid);
    res.status(200).json({message:'joined Successful',group:group});
}