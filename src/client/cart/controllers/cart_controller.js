const CartService = require('../services/cart_services');

module.exports = {
  // Add product to cart
  addToCart: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { productId, quantity } = req.body;
      const cart = await CartService.addToCart(userId, productId, quantity);
      res.status(200).json(cart);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Update product quantity in cart
  updateCartItem: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { productId, quantity } = req.body;
      const cart = await CartService.updateCartItem(userId, productId, quantity);
      res.status(200).json(cart);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Remove product from cart
  removeCartItem: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { productId } = req.body;
      const cart = await CartService.removeCartItem(userId, productId);
      res.status(200).json(cart);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all cart items for user
  getCart: async (req, res) => {
    try {
      const userId = req.user.userId;
      const cart = await CartService.getCart(userId);
      res.status(200).json(cart);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

};