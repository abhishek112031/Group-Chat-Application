const path=require('path');
const Group=require('../models/group');
const User_Group=require('../models/usergroup');

const {Op} = require('sequelize');


function invalidInput(input) {
    if (input === undefined || input.length === 0) {
         return true;
    }
    else {
         return false;
    }
}

exports.getGroupPage=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','group.html'));
}
exports.getuserName=(req,res,next)=>{
    res.status(200).json({username:req.user.name})
}

exports.createNewGroup= async (req,res,next)=>{
    try{


        const {newGroup}=req.body;
        if(invalidInput(newGroup)){
            return res.status(400).json({ message: 'input can not be empty or undefined' });

        }
    
        const userNewGroup= await req.user.createGroup({nameOfGroup:newGroup},{through: {isAdmin : true}});
        // console.log("===>",userNewGroup);
    
        return res.status(201).json({ nameOfGroup: userNewGroup.nameOfGroup ,id:userNewGroup.id});
    }
    catch(err){
        return res.status(500).json({success : false, message: 'Something went wrong !'});
    }


};



exports.userAllGroups=async (req,res,next)=>{
try{

    const arrayOfGroups = await req.user.getGroups({
        attributes : ["id" , "nameOfGroup"]
    });
    res.status(200).json(arrayOfGroups);
}
catch(err){
    res.status(500).json({message:'Something Went Wrong !'});


}

};



exports.otherGroups=async(req,res,next)=>{
    try{

        const userGroup=await req.user.getGroups();
        let groupIds=[];
        userGroup.forEach(element => {
            groupIds.push(element.id)
            
        });    
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
        // console.log("err--->",err)
    res.status(500).json({message:'Something Went Wrong !'});

    }


};

exports.joinGroup=async(req,res,next)=>{
    try{

        const groupid=req.params.Id;
    
        const userGroupUpdate=await User_Group.create({
            userId:req.user.id,
            groupId:groupid,
            isAdmin:false
        });
        const group=await Group.findByPk(groupid);
        res.status(200).json({message:'joined Successful',group:group});
    }
    catch(err){
    res.status(500).json({message:'Something Went Wrong !'});

    }
};

exports.deleteGroupByAdmin=async(req,res,next)=>{
    try{
        const {groupId}=req.params;
        const isAdminMember = await User_Group.findOne({where : {groupId: groupId, userId : req.user.id , isAdmin: true}});

        if(!isAdminMember){
            return res.status(400).json({success : false ,message : `Only Admin can delete group !`});
        }
       else if(isAdminMember){
            const group = await Group.destroy({where : { id : groupId}});
            return res.status(200).json({success : true ,message : `Group has deleted sucessfully`});
        }
    }
    catch(err){
        // console.log(err);
        return res.status(500).json({success: false, message : `Something went wrong !`});
    }
}