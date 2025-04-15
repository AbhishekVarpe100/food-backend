const Cart = require("../models/Cart");
const Food = require("../models/Food");
const Order = require("../models/Order");
const cloudinary = require('cloudinary').v2;
const fs = require("fs");
const Suggestion = require("../models/Suggestion");

// In your adminController.js
exports.addItem = async (req, res) => {
  try {
    // If file is uploaded, req.file will contain the Cloudinary details
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const {food,price,quantity,category}=req.body
    
    // Access the Cloudinary URL
    const imageUrl = req.file.path;
    
    const newItem=new Food({name:food,file:imageUrl,price,quantity,category })
    newItem.save()
      
    // Save your item with the image URL
    // ...your code to save the item...

    // res.status(201).json({ message: "Item added successfully", imageUrl });
    
    res.json({msg:'added'})
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Error adding item", error: error.message });
  }
  
};

exports.getCustData = async (req, res) => {
  const data = await Food.find();
  res.json(data);
};

exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  const user = await Food.findById(id);
  const url=user.file
  let urlArr=url.split("Food_Images")
  let publicId=`Food_Images${urlArr[1].split('.')[0]}`  

  try{
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result === 'ok') {
      await Food.findByIdAndDelete(id);
      return res.json('deleted');
    } else {
      return res.status(400).json({ success: false, message: 'Failed to delete image' });
    }
  }
  catch(err){
    console.log(err)
  }

};

exports.updateQuantity = async (req, res) => {
  const { quantity, id, av_quantity } = req.body;
  await Food.updateOne(
    { _id: id },
    {
      $set: {
        quantity: Number.parseInt(av_quantity) + Number.parseInt(quantity),
      },
    }
  );
  res.json("updated");
  // console.log(id,quantity,av_quantity)
};

exports.getData = async (req, res) => {
  const data = await Food.find().limit(3);
  const totalItems=await Food.find()
  res.json({data:data,total:totalItems.length});
};

exports.updatePrice = async (req, res) => {
  const { price, id, prev_price } = req.body;
  await Food.updateOne({ _id: id }, { price: price });
  res.json("updated");
};

exports.getOrdersData = async (req, res) => {
  const data = await Order.find();
  res.json(data);
};

exports.updateStatus = async (req, res) => {
  const [name, checked] = req.body;
  // console.log(req.body)
  const id = req.params.id;

  try {
    const result = await Order.updateOne(
      { _id: id },
      { $set: { [name]: checked } }
    );

    res.status(200).json({ message: "Order status updated successfully." });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.adminCart = async (req, res) => {
  try {
    const data = await Cart.find();
    let userNames = data.map((item) => item.username);
    let distinctNames = [...new Set(userNames)];
    res.json(distinctNames);
  } catch (e) {
    console.log(e);
  }
};

exports.getDataByUserName = async (req, res) => {
  const username = req.query.username;
  try {
    let data = await Cart.find({ username });
    res.json(data).status(200);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllSuggestions=async(req,res)=>{
  let data=await Suggestion.find()
  res.json(data).status(200)
}

exports.postReply=async(req,res)=>{
  const {reply,id}=req.body
  await Suggestion.findByIdAndUpdate({_id:id},{$set:{reply}})
  res.json('replied')
}
