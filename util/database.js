const { Sequelize } = require("sequelize");
// const dotenv=require('dotenv');
// dotenv.config();

const sequelize=new Sequelize('chatdb','root','mysql@2022',{
    dialect:'mysql',
    host: 'localhost'
});

module.exports=sequelize;