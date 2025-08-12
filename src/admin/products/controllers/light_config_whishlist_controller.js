const wishlistService = require('../services/light_config_whishlist_service');

class LightConfigWhishlistController {
  async setWishlist(req, res) {
    try {
      const userId = req.user?._id;
      if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

      const { wishlist } = req.body; // expects array of strings
      const result = await wishlistService.setWishlist(userId, wishlist);
      return res.json(result);
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  async getWishlist(req, res) {
    try {
      const userId = req.user?._id;
      if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

      const result = await wishlistService.getWishlist(userId);
      return res.json(result);
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }
}

module.exports = new LightConfigWhishlistController();
