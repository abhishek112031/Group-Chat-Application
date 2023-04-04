const path=require('path');

exports.getGroupPage=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','group.html'));
}