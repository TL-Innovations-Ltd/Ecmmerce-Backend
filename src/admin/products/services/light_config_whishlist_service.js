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

    // Overwrite logic: replace the wishlist entirely with the provided array
    const doc = await LightConfigWhishlist.findOneAndUpdate(
      { user_id: userId },
      { $set: { wishlist: cleaned }, $setOnInsert: { user_id: userId } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    return { success: true, wishlist: doc.wishlist };
  },

  getWishlist: async (userId) => {
    const doc = await LightConfigWhishlist.findOne({ user_id: userId }).lean();
    return { success: true, wishlist: doc?.wishlist};
  }
};
