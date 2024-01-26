const mongoose = require('mongoose');
const { User } = require('./user');
// Blog Schema 

const blogSchema = new mongoose.Schema({
    blog_article: {
        type: String,
        default: ""
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

// UserBlogMetadata Schema
const userBlogMetadata = new mongoose.Schema({
    blog_title: {
        type: String,
        required: true
    },
    blog_info: {
        type: String,
        required: true,
    },
    blog_img: {
        type: String,
        default : "vieionvbie" 
    },
    author_username:{
        type : String ,
        required : true 
    },
    upvote_count:
    {
        type: Number,
        default: 0
    },
    downvote_count: {
        type: Number,
        default: 0
    },
    view_count :{
        type : Number , 
        default : 0
    },
    category: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    last_updated: {
        type: Date,
        default: Date.now()
    },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
});



// Comment Schema
const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    last_updated: { type: Date, default: Date.now() },
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name:{
        type : String , 
        required : true 
    },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});


// Model Definitions
const Blog = mongoose.model('Blog', blogSchema);
const UserBlogMetadata = mongoose.model('UserBlogMetadata', userBlogMetadata);
const Comment = mongoose.model('Comment', commentSchema);

// Export Models
module.exports = {
    Blog,
    UserBlogMetadata,
    Comment,
};
