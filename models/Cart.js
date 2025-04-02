const mongoose=require('mongoose')
const Schema=mongoose.Schema


//Define the cart schema
const cartSchema=new Schema({
    username:{
        type:String,
        required:true,
    }
    ,
    name:{
        type:String,
        required:true,
    },
    file:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
})

// Create the cart model
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;