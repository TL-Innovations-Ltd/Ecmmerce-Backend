const Cart = require('../models/cart_models');
const Product = require('../../../admin/products/models/product_model');

module.exports = {

    addToCart: async (userId, productId, quantity = 1) => {

        // Fetch product to check stock
        const product = await Product.findById(productId);
        if (!product) throw new Error('Product not found');
        if (product.stock < quantity) throw new Error('Out of Stock');

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [{
                    product: productId,
                    quantity: quantity
                }]
            });
        } else {
            const item = cart.items.find(i => i.product.toString() === productId);
            console.log(item);
            if (item) {
                item.quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }
        }
        await cart.save();
        return cart;
    },

    updateCartItem: async (userId, productId, quantity) => {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) throw new Error('Cart not found');
        const item = cart.items.find(i => i.product.toString() === productId);
        console.log(item);
        if (!item) throw new Error('Product not in cart');
        item.quantity = quantity;
        await cart.save();
        return cart;
    },

    removeCartItem: async (userId, productId) => {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) throw new Error('Cart not found');
        cart.items = cart.items.filter(i => i.product.toString() !== productId);
        await cart.save();
        return cart;
    },

    getCart: async (userId) => {
        return Cart.findOne({ user: userId }).populate('items.product');
    }
};