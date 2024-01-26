const {UserBlogMetadata} = require('../model/blog'); 


let upvoteBlog = async (req,res) =>{
    try{
        const id  = req.params.id ;
        await UserBlogMetadata.findOneAndUpdate({blog : id}, {$inc : {upvote_count : 1}}) ;
        const upvote = await UserBlogMetadata.findOne({blog : id}) ;
        res.status(200).json({msg : "Upvoted successfully" , upvote_count : upvote.upvote_count}) ;
        
    }catch(err){
        console.log(err); 
        res.status(500).json({msg: "An error occurred"});
    }
}

let downvoteBlog = async (req,res) =>{
    try{
        const id  = req.params.id ;
        await UserBlogMetadata.findOneAndUpdate({blog : id}, {$dec : {downvote_count : 1}}) ;
        const upvote = await UserBlogMetadata.findOne({blog : id}) ;
        res.status(200).json({msg : "Upvoted successfully" , upvote_count : upvote.upvote_count}) ;
        
    }catch(err){
        console.log(err); 
        res.status(500).json({msg: "An error occurred"});
    }
}

module.exports = {upvoteBlog,downvoteBlog}; 