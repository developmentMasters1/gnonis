const express = require("express") ;
const Router = express.Router() ;
const {userSignUp} = require("../controllers/userSignup.js") ;  
const {userLogin,successUserHomePage,commonUserHomePage} = require("../controllers/userHomepage.js") ; 
const {authenticateUser , confirmBlogOwner} = require("../middleware/authenticate.js") ;
const {checkEmail,checkUsername} = require("../controllers/checkAvailable.js") ;
const {getBlogData,updateBlogData,addBlog, getBlogByCategory , getTrendingBlog , getBlogByKeyword , getRecentBlog , getMostViewedBlog , getUserBlogData} = require("../controllers/blog.js") ;
const {upvoteBlog,downvoteBlog} = require("../controllers/vote.js") ;
const {addComment} = require("../controllers/comment.js") ;
const {handleUploadImage,getImage} = require("../controllers/uploadImage.js") ;
const {upload} = require("../middleware/multerConfig.js") ;




Router.post("/signup",userSignUp) ; 
Router.post("/login" ,userLogin)  ;



Router.get("/", commonUserHomePage)  ; 
Router.get("/success/:username", authenticateUser,successUserHomePage)  ;

Router.get("/blog/:id" , getBlogData)  ;      // Get blog data by id 
Router.get("/blog", getBlogByCategory)  ;  // Get blog data by category
Router.get("/blog/trending" , getTrendingBlog)  ;  // Get trending blog data
Router.get("/blog/search" , getBlogByKeyword)  ;  // Get blog data by keyword
Router.get("/blog/recent"  , getRecentBlog)  ;  // Get recent blog data
Router.get("/blog/mostviewed" , getMostViewedBlog)  ;  // Get most viewed blog data
Router.get("/blog/user/list" ,authenticateUser, getUserBlogData  );  // Get blog data --> Based on authorized user



Router.post("/blog" ,authenticateUser, addBlog)  ;  // Add blog data --> Based on authorized user
Router.put("/blog/:id" ,authenticateUser,confirmBlogOwner,updateBlogData)  ;  // Update blog data by id --> Based on authorized user 
Router.put("/blog/:id/upvote" ,authenticateUser ,upvoteBlog)  ;   // Upvote blog by id
Router.put("/blog/:id/downvote" ,authenticateUser , downvoteBlog)  ;   // Downvote blog by id

// Router.delete("blog/:id/comment", authenticateUser,deleteComment)  ;  // Delete comment by id
Router.post("/blog/:id/comment" ,authenticateUser, addComment)  ;  // Add comment to blog by id 

Router.post("/checkusername", checkUsername)  ;  // Check if username is available
Router.post("/checkemail", checkEmail)  ;  // Check if email is available


// Router for image handling 

Router.post("/upload", upload.single("file") ,handleUploadImage) ;
Router.get("/uploads/:filename", getImage) ; 


 
module.exports = Router ; 