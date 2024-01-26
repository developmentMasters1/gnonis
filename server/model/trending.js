const mongoose = require('mongoose');
const {userBlogMetadata} = require('./blog');

// TopPosts Schema
const topPostsSchema = new mongoose.Schema({
    userBlogs:{
      type: [userBlogMetadata]
    }
  });

 
// RecentPosts Schema
  const recentPostsSchema = new mongoose.Schema({
    userBlogs: {
      type: [userBlogMetadata]
    } 
  });


// MostViewedPosts Schema
  const mostViewedPostsSchema = new mongoose.Schema({
    userBlogs: {
      type: [userBlogMetadata]
    } 
  });


const TopPosts = new mongoose.model("TopPosts" , topPostsSchema ) ;
const RecentPosts = new mongoose.model("RecentPosts" , recentPostsSchema ) ;
const MostViewedPosts = new mongoose.model("MostViewedPosts" , mostViewedPostsSchema ) ;

module.exports = {TopPosts,RecentPosts,MostViewedPosts};