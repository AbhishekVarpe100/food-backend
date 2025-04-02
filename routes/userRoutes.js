// const express=require('express')
// const router=express.Router();
// const Razorpay = require('razorpay');
// const bcrypt=require('bcrypt')
// const jwt=require('jsonwebtoken')
// const fs=require('fs')
// const path=require('path')
// require('../Connection')
// const User=require('../models/User')
// const Food=require('../models/Food')
// const Order=require('../models/Order')
// const axios=require('axios')

// const secretKey='food-delivery-web-app';

// const {body,validationResult}=require('express-validator');

// const nodemailer=require('nodemailer')
// const validator=require('validator')

// const Cart = require('../models/Cart');
// const Fav=require('../models/Fav')
// const registerValidator=[
//     body('username','Minimum length 6 characters required').isLength({min:6}),
//     body('email','Invalid email address').isEmail(),
//     body('password','Minimum length 6 characters required').isLength({min:6}),
// ]




// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'abhishekvarpe8@gmail.com',
//       pass: 'cebs vvaf ekpi bzol',
//     },
//   });

// // register route

// router.post('/register',registerValidator,async(req,res)=>{
//     const {username,email,password}=req.body;
//     const error=validationResult(req);
//     const Username=await User.find({username})
//     const Email=await User.find({email})
//     if( Email.length>0 || Username.length>0){
//         res.json({msg:'exist'})
//     }
//     else{
//         if(error.isEmpty()){
//             const hashedPass=await bcrypt.hash(password,10)
//             const user=new User({username,email,password:hashedPass})
//             user.save()
//             const response=await axios.post("http://localhost:3000/send-mail",{email})
//             res.json({register:response.data})
//         }
//         else{
//             res.json({errors:error.array()})
//         } 
//     }
// })


// router.post('/send-mail',async(req,res)=>{
//     const { email: to } = req.body;

//     const subject = 'Welcome to Food Ordering Service!';
//     const text = 'Thank you for joining us. We are excited to have you onboard and look forward to serving you.';
    
//     if (!validator.isEmail(to)) {
//         return res.status(400).send('Invalid email address');
//     }

//     const mailOptions = {
//         from: 'abhishekvarpe8@gmail.com',
//         to,
//         subject,
//         html: `
//             <div style="font-family: 'Arial', sans-serif; line-height: 1.8; color: #333333; max-width: 600px; margin: 0 auto; border: 1px solid #dddddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9; box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);">
//                 <div style="text-align: center; border-bottom: 1px solid #dddddd; padding-bottom: 15px; margin-bottom: 20px;">
//                     <h1 style="color: #2c3e50; font-size: 24px; margin: 0;">Welcome to Food Ordering Service!</h1>
//                     <p style="color: #7f8c8d; font-size: 16px; margin: 5px 0;">The best place for all your food cravings</p>
//                 </div>
//                 <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">
//                     Dear Valued Customer,<br/><br/>
//                     Thank you for registering with <strong>Food Ordering Service</strong>. We are thrilled to have you as part of our growing community of food lovers. Our mission is to provide you with a seamless experience in exploring and ordering from the best restaurants in your area.
//                 </p>
//                 <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">
//                     You can now start browsing through our menu, placing orders, and enjoying exclusive offers tailored just for you. Our team is committed to ensuring a delightful and hassle-free service every time.
//                 </p>
                
//             </div>
//         `
//     };
    
    
    
//     //   Send the email
//       transporter.sendMail(mailOptions, (err, info) => {
//         if (err) return res.status(500).send(`Error: ${err.message}`);
//         res.json('success')
//       });
    
//       // Send the email
//     //   transporter.sendMail({ from: 'abhishekvarpe8@gmail.com', to, subject, text }, (err, info) => {
//         // if (err) return res.status(500).send(`Error: ${err.message}`);
//     //     res.json('success')
//     //   });
// })



// const razorpay = new Razorpay({
//     key_id: 'rzp_test_DTuJNXNxcaHEqZ', // Replace with your Razorpay key ID
//     key_secret: 'bkZZxnjy19Rji0SeqGYYbHf3', // Replace with your Razorpay key secret
//   });






// // Create a payment order
// router.post('/create-order', async (req, res) => {
//     const { amount, currency } = req.body;
  
//     const options = {
//       amount: amount * 100, // Amount is in paisa, so multiply by 100
//       currency,
//       receipt: 'receipt#1',
//       payment_capture: 1, // Automatically capture the payment
//     };
  
//     try {
//       const order = await razorpay.orders.create(options);
//       res.json(order);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

  

// // login route


// router.post('/login',async(req,res)=>{
//     let user=await User.find({username:req.body.username})

//     if(req.body.username!='admin'){
//         const isCompare=await bcrypt.compare(req.body.password,user[0].password)
//         if(isCompare){
//             jwt.sign({username:user.username,email:user.email},secretKey,{expiresIn:'1h'},(err,token)=>{
//                 if(err){
//                     console.log(err)    
//                 }
//                 else{
//                     res.json({token,message:"login successful",username:user[0].username,email:user[0].email})
//                 }
//             })

//         }
//         else{
//             res.json('Incorrect password')
//         }
        
//     }
//     else{
//         res.json("admin")
//     }
// })

// router.get('/gethome',verifyToken,async(req,res)=>{

//     jwt.verify(req.token,secretKey,(err,authData)=>{
//         if(err){
//             res.json({msg:'invalid token'})
//         }
//         else{
//             res.json({msg:'profile accesed',authData})
//         }
//     })

// })

// function verifyToken(req,res,next){

//     const bearerHeader=req.query.token;
//     if(!bearerHeader){
//         res.json({msg:"token not present"})
//     }
//     else{

//         const bearer=bearerHeader.split(" ")
//         const token=bearer[1]
//         req.token=token;
//         next()

        
//     }

// }

// router.get('/get-data',async(req,res)=>{
//     const data=await Food.find().limit(3);
//     res.json(data)

// })
// router.get('/get-data-cust',async(req,res)=>{
//     const data=await Food.find();
//     res.json(data)

// })

// router.delete('/delete-item/:id',async(req,res)=>{
//     const id=req.params.id;
//     const user=await Food.findById(id)
    
//     fs.unlink(`./Public/Food_Images/${user.file}`,async (err)=>{
//         if(err){
//             console.log(err)
//         }
//         else{
//            await Food.findByIdAndDelete(id);
//             res.json('deleted')
//         }
//     })
// })

// router.get('/get-item',async(req,res)=>{
//     const {id}=req.query;
//     const data=await Food.findById(id)
//     res.json(data)
// })




// // const transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     user: 'abhishekvarpe8@gmail.com',
// //     pass: 'cebs vvaf ekpi bzol',
// //   },
// // });

// router.post('/confirm-order',async(req,res)=>{

//     const { name, phone, address ,item,price,quantity,av_quantity,username,file}=req.body;
//     try{

//         const order=new Order({cust_name:name,mobile:phone,addr:address,item_name:item,price,quantity,username,ordered:true})
//         await order.save();
//         await Food.updateOne({name:item},{$set:{quantity:`${Number.parseInt(av_quantity-quantity)}`}})

//         const user=await User.findOne({username})
//         const email=user.email
//         const to=user.email
//         const subject='Order Confirmed!'
//         const totalPrice=price;
//         const text=`Hello ${name}, Your order for item ${item}, quantity ${quantity} is confirmed. It will deliver to your adddress : ${address}. Cash on delivery : ${price} Rs. Thank you for ordering, enjoy the food.😇 `

//         const response=await axios.post('http://localhost:3000/demo_',{email,to,subject,text,file})
//         res.json(response.data)


//     }
//     catch(err){
//         console.log(err)
//     }

// })

        


// router.post('/demo_',async(req,res)=>{
//     const {email, to, subject, text ,file} = req.body;
    

// //   Validate email using the validator library
//   if (!validator.isEmail(to)) {
//     return res.status(400).send('Invalid email address');
//   }

//   const mailOptions = {
//     from: 'abhishekvarpe8@gmail.com',
//     to,
//     subject,
//     html: `
//         <div style="font-family: Georgia, serif; line-height: 1.6; color: #2c3e50; max-width: 600px; margin: 0 auto; border: 2px solid #eaeaea; border-radius: 10px; padding: 25px; background-color: #ffffff; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);">
//             <div style="text-align: center; border-bottom: 2px solid #eaeaea; padding-bottom: 15px; margin-bottom: 20px;">
//                 <h1 style="text-align: center; color: #4CAF50; font-size: 24px; margin-bottom: 20px;">${subject}</h1>
//                 <p style="color: #7f8c8d; font-size: 16px; margin: 0;">A message for you</p>
//             </div>
//             <p style="font-size: 16px; color: #34495e; margin-bottom: 25px;">
//                 ${text}
//             </p>
//             <div style="text-align: center; margin: 20px 0;">
//                 <img src="cid:unique@image" alt="Attached Image" style="max-width: 90%; height: auto; border: 5px solid #ecf0f1; border-radius: 12px; box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);" />
//             </div>
//             <div style="text-align: center; margin-top: 25px; font-size: 14px; color: #7f8c8d;">
                
//                 <p style="margin: 0;">&copy; 2025 Food Ordering Service. All rights reserved.</p>
//             </div>
//         </div>
//     `,
//     attachments: [
//         {
//             filename: 'image.jpg',
//             path: path.join(__dirname,'../Public/Food_Images', file), // Absolute path
//             cid: 'unique@image'
//         }
//     ]
// };



// //   Send the email
//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) return res.status(500).send(`Error: ${err.message}`);
//     res.json('confirmed')
//   });

//   // Send the email
// //   transporter.sendMail({ from: 'abhishekvarpe8@gmail.com', to, subject, text }, (err, info) => {
//     // if (err) return res.status(500).send(`Error: ${err.message}`);
// //     res.json('confirmed')
// //   });

// })


// router.put('/update-quantity',async(req,res)=>{
    
//     const {quantity,id,av_quantity}=req.body;
//     await Food.updateOne({_id:id},{$set:{quantity:Number.parseInt(av_quantity)+Number.parseInt(quantity)}})
//     res.json('updated')
//     // console.log(id,quantity,av_quantity)
    
// })

// router.put('/update-price',async(req,res)=>{
//     const {price,id,prev_price}=req.body;
//     await Food.updateOne({_id:id},{price:price})
//     res.json('updated')
// })


// router.get('/get-orders',async(req,res)=>{
//     const username=req.query.username;
//     const data=await Order.find({username:username})
//     res.json(data)
// })

// router.delete('/delete-order/:id',async(req,res)=>{
//     const id=req.params.id;
//     await Order.findByIdAndDelete(id)
//     res.json('deleted')
// })


// const send_mail=async(username,itemname)=>{
//     let user=await User.find({username})
//     let email=user[0].email
//     let subject='Cart Reminder'


//     const mailOptions = {
//         from: 'abhishekvarpe8@gmail.com',
//         to:email,
//         subject,
//         html: `
//             <div style="font-family: 'Georgia', serif; line-height: 1.8; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 10px; padding: 30px; background-color: #fff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
//     <div style="text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 15px; margin-bottom: 20px;">
//         <h1 style="color: #2c3e50; font-size: 28px; font-weight: bold; margin-bottom: 10px; letter-spacing: 1px;">Item Added to Cart</h1>
//         <p style="color: #555; font-size: 15px; margin: 0; font-style: italic;">Here’s a friendly reminder</p>
//     </div>
//     <p style="font-size: 17px; color: #444; margin-bottom: 30px; text-align: justify;">
//         You’ve added <strong style="color: #2c3e50;">${itemname}</strong> to your cart. Why not complete your purchase now?
//     </p>
//     <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #555;">
//         <p style="margin: 0; font-size: 13px;">&copy; 2025 Food Ordering Service. All rights reserved.</p>
//     </div>
// </div>

//         `,
//     };
    
    
    
//     //   Send the email
//       transporter.sendMail(mailOptions, (err, info) => {
//         if (err){
//             console.log(err.message)

//         }
//         else if(info){
//             console.log(info)
//         }
//       });




// }   


// router.post('/add-to-cart',async(req,res)=>{
//     const data=await Food.findById({_id:req.body.id})
//     const cartItem=new Cart({username:req.body.username,name:data.name,file:data.file,price:data.price})
//     cartItem.save()
//     await Food.findByIdAndUpdate({_id:req.body.id},{$set:{cart_status:'added'}})
//     res.json({msg:'added'})
//     const user_name=req.body.username
//     const item_name=data.name

//     setTimeout(()=>{
//         send_mail(user_name,item_name)
//     },600000)
// })

// router.get('/get-cart',async(req,res)=>{
//     const username=req.query.username;
//     const data=await Cart.find({username})
//     res.json(data)

// })

// router.delete('/remove-cart/:id',async(req,res)=>{
//     const id=req.params.id;
//     const data=await Cart.findById(id)
//     await Food.updateOne({name:data.name},{$set:{cart_status:""}})
//     await Cart.findByIdAndDelete(id)
//     res.json('deleted')
    
// })


// router.get('/get-orders-data',async(req,res)=>{
//     const data=await Order.find();
//     res.json(data)
// })

// router.post('/confirm-all-order',async(req,res)=>{
//     const {full_name,mobile,address,username,email}=req.body;
//     const cart=await Cart.find({username})
//     let items=''
//     let totalPrice=0
//     for(let i=0;i<cart.length;i++){
//         const newOrder=new Order({cust_name:full_name,mobile:mobile,addr:address,item_name:cart[i].name,price:cart[i].price,quantity:'1',username,ordered:true})
//         newOrder.save()
//         items+=`${cart[i].name}, `
//         totalPrice+=Number.parseInt(cart[i].price)
//         await Food.updateOne({name:cart[i].name},{$set:{cart_status:""}})
//         await Cart.findByIdAndDelete({_id:cart[i]._id})
//     }
//     const text=`Hello ${full_name}, Your order for items ${items} is confirmed. It will deliver to your adddress : ${address}. Cash on delivery : ${totalPrice} Rs. Thank you for ordering, enjoy the food.😇 `
//     const resp=await axios.post('http://localhost:3000/send-cart-mail',{to:email,subject:'Order Confirmed!',text})

//     if(resp.data){
//         res.json("ordered")
//     }
// })



// router.post('/send-cart-mail',async(req,res)=>{
//     const {to, subject, text } = req.body;
    

//     //   Validate email using the validator library
//       if (!validator.isEmail(to)) {
//         return res.status(400).send('Invalid email address');
//       }
    
//       const mailOptions = {
//         from: 'abhishekvarpe8@gmail.com',
//         to,
//         subject,
//         html: `
//             <div style="font-family: 'Times New Roman', serif; line-height: 1.8; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ccc; border-radius: 10px; padding: 30px; background-color: #f9f9f9; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
//     <div style="text-align: center; border-bottom: 1px solid #ccc; padding-bottom: 15px; margin-bottom: 20px;">
//         <h1 style="text-align: center; color: #2c3e50; font-size: 26px; font-weight: bold; margin-bottom: 15px;">${subject}</h1>
//         <p style="color: #555; font-size: 14px; margin: 0; font-style: italic;">A personal message for you</p>
//     </div>
//     <p style="font-size: 16px; color: #444; margin-bottom: 30px; text-align: justify;">
//         ${text}
//     </p>
//     <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #555;">
//         <p style="margin: 0; font-size: 13px;">&copy; 2025 Food Ordering Service. All rights reserved.</p>
//     </div>
// </div>

//         `,
//     };
    
    
    
//     //   Send the email
//       transporter.sendMail(mailOptions, (err, info) => {
//         if (err) return res.status(500).send(`Error: ${err.message}`);
//         res.json('confirmed')
//       });
    
//       // Send the email
//     //   transporter.sendMail({ from: 'abhishekvarpe8@gmail.com', to, subject, text }, (err, info) => {
//         // if (err) return res.status(500).send(`Error: ${err.message}`);
//     //     res.json('confirmed')
//     //   });

// })

// router.get('/get-status/:id',async(req,res)=>{
//     const id=req.params.id
//     const item=await Order.findOne({_id:id})
//     res.json(item)
// })

// // router.put('/update-status/:id',async(req,res)=>{
// //     const {name,checked}=req.body
// //     // const {ordered,packed,dispatched:dispached,shipped,delivered,_id}=req.body;
// //     const id=req.params.id
// //     await Order.updateOne({_id:id},{$set:{[name]:checked}})
// //     console.log(name,checked)

   
// // })
// router.put('/update-status/:id', async (req, res) => {
//     const [ name, checked ] = req.body;
//     // console.log(req.body)
//     const id = req.params.id;

//     try {
//         const result = await Order.updateOne(
//             { _id: id },
//             { $set: { [name]: checked } }
//         );


//         res.status(200).json({ message: 'Order status updated successfully.' });
//     } catch (error) {
//         console.error('Error updating order status:', error);
//         res.status(500).json({ error: 'Internal server error.' });
//     }
// });


// router.post('/post-comment',async(req,res)=>{
//     const {id,username,rating,comment}=req.body
//     const added_review=await Food.findByIdAndUpdate(id,{$push:{reviews:{reviewer:username,rating,comment}}},{new:true})
//     res.json('added')
// })


// router.get('/get-reviews/:id',async(req,res)=>{
//     const id=req.params.id;
//     const data=await Food.findById(id)

//     res.json(data.reviews)
// })



// router.delete('/delete-review', async (req, res) => {
//     try {
//         const { review_id, item_id } = req.query; // Extract food and review identifiers from query params

//         // Update the food document to remove the review
//         const result = await Food.findByIdAndUpdate(
//             {_id:item_id}, // The ID of the food item
//             { $pull: { reviews: { _id: review_id } } }, // Remove the review by its unique `_id`
//             { new: true } // Return the updated document
//         );

//         if (result) {
//             res.status(200).json({
//                 message: 'Review deleted successfully',
//                 updatedFood: result,
//             });
//         } else {
//             res.status(404).json({ message: 'Food item or review not found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error', error });
//     }
// });


// router.get('/order-by',async(req,res)=>{
//     const option=req.query.option
//     if(option==""){
//         console.log("invalid sorting")
//     } 
//     else{
//         const data=await Food.find().sort({[option]:1}) 
//         res.json(data)
//     }
// })

// router.post('/next-page', async (req, res) => {
//     const {page}=req.body;
//     var data=await Food.find().limit(page)
//     if(page>3){
//         data=await Food.find().skip(page-3).limit(3)
//     }
    
//     res.json(data)
    
// });

// router.post('/prev-page',async(req,res)=>{
//     const {page}=req.body;
//     var data=await Food.find().limit(page)
//     if(page>3){
//         data=await Food.find().skip(page-3).limit(3)
//     }
//     else if(page<=0){
//         data=await Food.find().limit(3)
//     }
//     res.json(data)

// })


// router.get('/get-admin-cart',async(req,res)=>{
// try{

//     const data=await Cart.find();
//     // res.json(data)
//     let userNames=data.map((item)=>item.username)
//     let distinctNames=[...new Set(userNames)]
//     res.json(distinctNames)

// }

// catch(e){
//     console.log(e)
// }
// })



// router.get('/get-data-by-username',async(req,res)=>{

//     const username=req.query.username;
//     try {

//         let data=await Cart.find({username})
//         res.json(data).status(200)
        
//     } catch (error) {
//         console.log(error);
//     }
// })


// router.get('/get-cart-count',async(req,res)=>{
//     let username=req.query.username
//     let cartData=await Cart.find({username})
//     res.json({"cart_count":cartData.length})
// })


// router.get('/search-item',async(req,res)=>{
//     let text=(req.query.searchText).toLowerCase()
//     let data=await Food.find()
//     let filteredData=data.filter((item)=>item.name.toLowerCase().includes(text))
//     if(filteredData.length>0){
//         res.json(filteredData)
//     }
//     else{
//         res.json([])
//     }
// })

// router.post('/add-fav',async(req,res)=>{
//     const username=req.body.username
//     const {name,file,price}=req.body[0];
//     const newFav=new Fav({username,file,price:Number(price),name})
//     newFav.save()
//     res.json('added')

// })


// router.get('/get-fav',async(req,res)=>{
//     const username=req.query.username
//     const data=await Fav.find({username})
//     res.json(data)
// })


// router.delete('/del-fav',async(req,res)=>{
//     const id=req.query.id
//     await Fav.findByIdAndDelete(id)
//     res.json('deleted').status(200)
// })

// router.get('/get-status',async(req,res)=>{
//     const username=req.query.username;

//     const fav=await Fav.find({username})
//     const data=fav.map(item=>item.name)
//     res.json(data)

// })



// module.exports=router
