require("dotenv").config(); 

 const handleUploadImage = (req, res) => {
    const url = `http://localhost:4000/uploads/${req.file.filename}` ;
    console.log(url) ; 
    res.status(200).json({url : url}) ; 
 
}


const getImage = (req,res) => {
    
    res.status(200).sendFile(  process.env.ROOT_PATH + '/uploads/' + req.params.filename);
    
}


module.exports = {handleUploadImage,getImage} ;  