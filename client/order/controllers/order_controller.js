const OrderService = require('../services/order_services');

module.exports = {
    
  // Create Order from Cart
  createOrderFromCart: async (req, res) => {
    try {
      const userId = req.user.userId;
      const address = req.body.address;
      if (!address) {
        return res.status(400).json({ error: 'Address is required' });
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
      const userId = req.user.userId;
      const orders = await OrderService.getUserOrderHistory(userId);
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};