const { 
  signupService, 
  loginService, 
  addFavoriteService, 
  removeFavoriteService, 
  getUserProfileService, 
  updateProfileService,
  updateProfilePictureService,
  removeProfilePictureService 
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

  updateProfilePicture: async (req, res) => {
    try {
      const { userId } = req.user;
      
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      const result = await updateProfilePictureService(userId, req.file);
      res.json(result);
    } catch (err) {
      console.error('Error in updateProfilePicture:', err);
      res.status(500).json({ 
        success: false, 
        message: err.message || 'Failed to update profile picture' 
      });
    }
  },

  removeProfilePicture: async (req, res) => {
    try {
      const { userId } = req.user;
      const result = await removeProfilePictureService(userId);
      res.json(result);
    } catch (err) {
      console.error('Error in removeProfilePicture:', err);
      res.status(500).json({
        success: false,
        message: err.message || 'Failed to remove profile picture'
      });
    }
  },

  // Get user profile
  getUserProfile: async (req, res) => {
    try {
      const user = await getUserProfileService(req.user.userId);
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

};
