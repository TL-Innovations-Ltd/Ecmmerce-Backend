const OrderService = require("../services/order_services");

module.exports = {
  // Create Order from Cart
  createOrderFromCart: async (req, res) => {
    try {
      const { userId } = req.user;
      const { address } = req.body;
      if (!address) {
        return res.status(400).json({ error: "Address is required" });
      }
      const order = await OrderService.createOrderFromCart(userId, address);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get User Order History
  getUserOrderHistory: async (req, res) => {
    try {
      const { userId } = req.user;
      const orders = await OrderService.getUserOrderHistory(userId);
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Search User Order History
  searchUserOrderHistory: async (req, res) => {
    try {
      const { userId } = req.user;
      const filters = req.body;
      const orders = await OrderService.searchUserOrderHistory(userId, filters);
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
