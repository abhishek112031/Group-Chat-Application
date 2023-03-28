const path=require('path');
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const userRoute=require('./routes/user');
const sequelize=require('./util/database');

//models:


const app=express();

app.use(bodyParser.json({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cors({
    origin:'http://127.0.0.1:5500/'
}));
app.use(userRoute);



sequelize
    // .sync({force:true})
    .sync()  
    .then(() => {
        app.listen(8000);
    })
    .catch(err=>{
        console.log(err)
    })


