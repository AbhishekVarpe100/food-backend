const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const adminControllers = require("../controllers/adminController");

const upload = multer({ storage });

// Complete the route handler with your controller function
router.post("/add-item",upload.single('file'),adminControllers.addItem);
router.get("/get-data-cust", adminControllers.getCustData);
router.delete("/delete-item/:id", adminControllers.deleteItem);
router.put("/update-quantity", adminControllers.updateQuantity);
router.put("/update-price", adminControllers.updatePrice);
router.get("/get-data", adminControllers.getData);
router.get("/get-orders-data", adminControllers.getOrdersData);
router.put("/update-status/:id", adminControllers.updateStatus);
router.get("/get-admin-cart", adminControllers.adminCart);
router.get("/get-data-by-username", adminControllers.getDataByUserName);
router.get("/get-all-suggestions", adminControllers.getAllSuggestions);
router.post("/post-reply", adminControllers.postReply);

module.exports = router;
