// const express=require('express');
// const router=express.Router();
// const multer=require('multer')
// const path=require('path')
// const Food=require('../models/Food')
// require('../Connection')

// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"Public/Food_Images")
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.fieldname +"_"+ Date.now() + path.extname(file.originalname))
//     }
// })

// const upload=multer({
//     storage:storage,
// })

// router.post('/add-item',upload.single('file'),async(req,res)=>{
//     const file=req.file.filename;
//     const {food,price,quantity}=req.body;
//     const newItem=await new Food({name:food,file,price,quantity})
//     await newItem.save()
//     res.json({msg:'added'})
// })





// module.exports=router;