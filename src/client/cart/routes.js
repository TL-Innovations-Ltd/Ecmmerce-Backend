const express = require('express');
const router = express.Router();
const cartController = require('./controllers/cart_controller');
// Assuming you have authentication middleware that sets req.user
const auth = require('../../middleware/user_verify');

router.post('/add', auth, cartController.addToCart);
router.put('/update', auth, cartController.updateCartItem);
router.delete('/remove', auth, cartController.removeCartItem);
router.get('/', auth, cartController.getCart);

module.exports = router;