
const {TopPosts} = require('../model/trending.js');
// const {} = require('../model/blog');

const {User} = require("../model/user.js");
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');
require('dotenv').config();``



// Takes in username and password and checks if the user exists in the database
let userLogin = async (req,res) => {
    try{
        console.log(req.body);``
        const user = await User.findOne({username: req.body.username});
        if(user === null){
            res.status(404).json({msg: "User not found"});
        }
        else{
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(validPassword){
                const token = jwt.sign({
                    name : user.name,
                    username : user.username,
                    emailId : user.emailId,
                }, process.env.JWT_SECRET);
                res.status(200).json({msg: "Successfully logged in" , accessToken : token , user });
            }
            else{
                res.status(401).json({msg: "Invalid credentials", accessToken: null });
            }
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: "An error occurred"});
    }


};

let commonUserHomePage = async (req,res) => {
    try{     
    const topPosts = await TopPosts.find() ; 
    res.status(200).json({posts : topPosts});

    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: "An error occurred"});
    }
}

let successUserHomePage = async (req,res) => {
    try{
        const topPosts = await TopPosts.find() ; 
        const user = await User.find({name : req.user.name}) ;
        
        res.status(200).json({posts : topPosts , userData : user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: "An error occurred"});
    }
}


module.exports = {userLogin,commonUserHomePage,successUserHomePage}; 