const mongoose = require('mongoose');


const lightConfigWhishlistSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true , ref: "User"},
    wishlist: [String]
})

module.exports = mongoose.model('LightConfigWhishlist', lightConfigWhishlistSchema);
