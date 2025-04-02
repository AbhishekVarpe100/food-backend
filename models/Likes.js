const mongoose=require('mongoose')
const likeSchema=new mongoose.Schema({
    username:String,
    suggestion_id:String
})

module.exports=mongoose.model("Like",likeSchema)