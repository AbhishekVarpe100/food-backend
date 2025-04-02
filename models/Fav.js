const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the fav schema
const favSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    name:{
        type:String,
        required:true,
    }
    
});

// Create the fav model
const Fav = mongoose.model('Fav', favSchema);
module.exports = Fav;
