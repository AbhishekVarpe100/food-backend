const Cart = require("../models/Cart");
const Food = require("../models/Food");
const Order = require("../models/Order");
const fs = require("fs");
const Suggestion = require("../models/Suggestion");
exports.addItem = async (req, res) => {
  const file = req.file.filename;
  const { food, price, quantity } = req.body;
  const newItem = await new Food({ name: food, file, price, quantity });
  await newItem.save();
  res.json({ msg: "added" });
};

exports.getCustData = async (req, res) => {
  const data = await Food.find();
  res.json(data);
};

exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  const user = await Food.findById(id);
  fs.unlink(`./Public/Food_Images/${user.file}`, async (err) => {
    if (err) {
      console.log(err);
    } else {
      await Food.findByIdAndDelete(id);
      res.json("deleted");
    }
  });
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
