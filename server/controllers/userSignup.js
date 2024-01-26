const { User } = require("../model/user");
const bcrypt = require('bcrypt');





let userSignUp = async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(req.body.password, salt) ; 
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            emailId: req.body.emailId,
            password: hashedPassword
        });

        const user =  await newUser.save();
       
        res.status(201).json({ msg: "Successfully signed up " });
    }
    catch (err) {

        console.log(err);
        res.status(500).json({ msg: "An error occurred" });
    }

}



module.exports = {userSignUp}; 