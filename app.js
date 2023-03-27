const path=require('path');
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const userRoute=require('./routes/user')

const app=express();

app.use(bodyParser.json({extended:false}));
app.use(cors());
app.use(userRoute);

app.listen(8000);


