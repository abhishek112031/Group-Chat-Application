const path=require('path');
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');

//models:
const User=require('./models/user');
const Message=require('./models/chatbox');

//routes:
const userRoute=require('./routes/user');
const chatRoute=require('./routes/chatbox');



const app=express();

app.use(bodyParser.json({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cors({
    origin:'http://127.0.0.1:5500/'
}));

//main middlewares:
app.use(userRoute);
app.use(chatRoute);




// table joins:
User.hasMany(Message);
Message.belongsTo(User);



sequelize
    // .sync({force:true})
    .sync()  
    .then(() => {
        app.listen(8000);
    })
    .catch(err=>{
        console.log(err)
    })



