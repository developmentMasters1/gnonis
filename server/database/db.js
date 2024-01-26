const mongoose = require("mongoose");


const uri = "mongodb+srv://nitish:QGawuknuTLqdYKqJ@cluster0.mbndhdw.mongodb.net/?retryWrites=true&w=majority";


const connect_db = async () => {
    try {

        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);

    }
}




module.exports = connect_db; 
