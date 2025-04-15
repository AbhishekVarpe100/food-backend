const mongoose=require('mongoose')
const Connection=mongoose.connect(process.env.MONGO_URI)
                    .then(()=>{
                        console.log("Mongo db connected")
                    })
                    .catch(err=>{
                        console.log(err)
                    })


module.exports=Connection;