const {
  signupService,
  loginService,
  addFavoriteService,
  removeFavoriteService,
  updateProfileService,
} = require("../services/services");

module.exports = {
  signup: async (req, res) => {
    try {
      const result = await signupService(req);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const result = await loginService(req);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  addFavorite: async (req, res) => {
    try {
      const { userId } = req.user;
      const { productId } = req.body;
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }
      const result = await addFavoriteService(userId, productId);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  removeFavorite: async (req, res) => {
    try {
      const { userId } = req.user;
      const { productId } = req.body;
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }
      const result = await removeFavoriteService(userId, productId);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { userId } = req.user;
      const profileData = req.body;
      const result = await updateProfileService(userId, profileData);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
