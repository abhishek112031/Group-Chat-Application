const path=require('path')

exports.getSignupPage=(req,res,next)=>{
     res.status(200).sendFile(path.join(__dirname,"..","views","signup.html"))
}