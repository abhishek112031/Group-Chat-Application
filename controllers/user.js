const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/user');

function invalidInput(input) {
     if (input === undefined || input.length === 0) {
          return true;
     }
     else {
          return false;
     }
}
exports.getSignupPage = (req, res, next) => {
     res.status(200).sendFile(path.join(__dirname, "..", "views", "signup.html"))
}
exports.postUserDetails = (req, res, next) => {

     const { name, email, phone, password } = req.body;
     if (invalidInput(name) || invalidInput(email) || invalidInput(password) || invalidInput(phone)) {
          return res.status(400).json({ message: 'input can not be empty or undefined' });
     };
     bcrypt.hash(password, 10, async (err, hash) => {
          try {

               const user = await User.create({
                    name: name,
                    email: email,
                    phone: phone,
                    password: hash
               });
               // console.log("user==>>", user);
               res.status(201).json({ message: 'user is created successfully', success: true })
          }
          catch (err) {
               res.status(500).json({ message: "email id or phone number is already exist", success: false });

          }

     })


}


