const mongoose = require("mongoose") ; 

const userSchema = new mongoose.Schema(
    {
        name :{
            type : String ,
            required : true ,
        } , 
        username :{
            type : String , 
            required : true ,
            unique : true   
        },
        emailId :{
            type : String , 
            required : true ,
            unique : true 
        }, 
        password :{
            type : String , 
            required : true 
        },
        userBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserBlogMetadata' }]


    }
)


const User = mongoose.model("user" , userSchema ) ; 

module.exports = {User};  