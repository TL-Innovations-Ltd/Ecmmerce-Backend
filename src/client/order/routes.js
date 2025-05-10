const express = require("express");

const router = express.Router();
const orderController = require("./controllers/order_controller");
const authUser = require("../../middleware/user_verify");

// Create order from cart
router.post("/create", authUser, orderController.createOrderFromCart);

// Get user order history
router.get("/history", authUser, orderController.getUserOrderHistory);

// Search/filter user order history
router.post("/history/search", authUser, orderController.searchUserOrderHistory);

module.exports = router;
