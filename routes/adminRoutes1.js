const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const adminControllers = require("../controllers/adminController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Food_Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/add-item", upload.single("file"), adminControllers.addItem);
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
