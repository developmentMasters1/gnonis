const multer = require("multer") ; 

const getUserName = (req) =>{
    console.log(req) ; 
    return  req.body.user|| "default"; 
}


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"./uploads/") ;
    },
    filename: function (req, file, cb) {
     
        const username = getUserName(req);
       
        cb(null,  username  +   '-' + Date.now() + file.originalname);
      }
    });
    
const upload = multer({ storage: storage });

module.exports = {upload} ;