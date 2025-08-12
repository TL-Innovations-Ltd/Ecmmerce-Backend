const LightConfigWhishlist = require('../models/light_config_whishlist');

module.exports = {
  // Append-only wishlist: adds only new names, keeps existing
  setWishlist: async (userId, names) => {
    if (!Array.isArray(names)) {
      throw new Error('wishlist must be an array of strings');
    }

    const cleaned = [...new Set(
      names
        .filter((n) => typeof n === 'string')
        .map((n) => n.trim())
        .filter(Boolean)
    )];

    if (cleaned.length === 0) {
      const existing = await LightConfigWhishlist.findOne({ user_id: userId }).lean();
      return { success: true, wishlist: existing?.wishlist || [] };
    }

    const doc = await LightConfigWhishlist.findOneAndUpdate(
      { user_id: userId },
      {
        $addToSet: { wishlist: { $each: cleaned } },
        $setOnInsert: { user_id: userId }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    return { success: true, wishlist: doc.wishlist };
  },

  getWishlist: async (userId) => {
    const doc = await LightConfigWhishlist.findOne({ user_id: userId }).lean();
    return { success: true, wishlist: doc?.wishlist};
  }
};
