require('dotenv').config();
const express =require('express');
const app=express();
const rateLimit=require('express-rate-limit')
const cors=require('cors')
require('./Connection')


app.use(express.json())
app.use(express.static("Public"))


// Rate limiting middleware
const limiter = rateLimit({
    max: 6, // 6 requests
    windowMs: 300 * 1000, 
    handler: (req, res) => {
        res.json({
            message_rate_limit: "Too many requests. Please try again after 300 seconds."
        });
    }
});

// app.use(limiter)

const userRoutes=require('./routes/userRoutes1')
const adminRoutes=require('./routes/adminRoutes1')
// const Connection=require('./Connection')
app.use(cors({
  origin: ["http://localhost:5173", "https://food-frontend-nine-psi.vercel.app"], // Allow both local and deployed frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(userRoutes)
app.use(adminRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on the port ${process.env.PORT}`)
})
