const express = require("express") ; 
const connect_db = require("./database/db.js") ; 
const cors = require("cors") ;
const Router = require("./routes/route.js");

const app = express() ; 
const PORT = 4000 ;

app.use(cors()); 

app.use(express.json()) ; 

app.use("/", Router);
connect_db() ; 



app.get("/", (req,res)=>{
        res.sendStatus(200).json("Hello"); 
        
})

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}.. `) ; 
})