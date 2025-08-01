const { 
  // signupService, 
  // loginService, 
  addFavoriteService, 
  removeFavoriteService, 
  getUserProfileService, 
  updateProfileService,
  updateProfilePictureService,
  removeProfilePictureService,
  submitContactFormService,
  getContactMessagesService,
  submitDistributorContact,
  getDistributorContacts	
} = require("../services/services");
//hello
module.exports = {
  // signup: async (req, res) => {
  //   try {
  //     const result = await signupService(req);
  //     res.status(201).json(result);
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // },

  // login: async (req, res) => {
  //   try {
  //     const result = await loginService(req);
  //     res.json(result);
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // },

  addFavorite: async (req, res) => {
    try {
      const userId  = req.user._id;
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
      const userId  = req.user._id;
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
      const  userId  = req.user._id;
      const profileData = req.body;
      const result = await updateProfileService(userId, profileData);
      // Clear cache for this user
      await clearCache('user', req.user._id)
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateProfilePicture : async (req, res) => {
    //hello
    try {
      const userId  = req.user._id;
      
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      const result = await updateProfilePictureService(userId, req.file);
      res.json({ success: true, imageUrl: result.imageUrl });
    } catch (err) {
      console.error('Error in updateProfilePicture:', err);
      res.status(500).json({ 
        success: false, 
        message: err.message || 'Failed to update profile picture' 
      });
    }
  },

  removeProfilePicture : async (req, res) => {
    try {
      const userId  = req.user._id;
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
  getUserProfile : async (req, res) => {
    try {
      const user = await getUserProfileService(req.user._id);
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Submit contact form
  submitContactForm : async (req, res) => {
    try {
      const userId  = req.user._id;
  
      const { name, email, subject, message } = req.body;
      
      const result = await submitContactFormService({userId,name,email,subject,message});
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Error in submitContactForm:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message || 'Failed to submit contact form' 
      });
    }
  },

  // Get contact messages (protected route - admin only)
  getContactMessages : async (req, res) => {
    try {
      // const { startDate, endDate, search } = req.query;

      // const filters = {};
      // if (startDate) filters.startDate = startDate;
      // if (endDate) filters.endDate = endDate;
      // if (search) filters.search = search;
      // const filters = req.user._id;

      const messages = await getContactMessagesService();

      res.status(200).json({
        success: true,
        count: messages.length,
        data: messages
      });
    } catch (error) {
      console.error('Error in getContactMessages:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch contact messages' 
      });
    }
  },
   

  // Submit distributor contact form (public endpoint)
  submitDistributorContact : async (req, res) => {
    try {
      const {
        name,
        company,
        contactName,
        title,
        email,
        phoneNumber,
        country,
        experience,
        message,
        privacyPolicy
      } = req.body;

      const userId  = req.user._id;

      const contactData = {
        userId,
        name,
        company,
        contactName,
        title,
        email,
        phoneNumber,
        country,
        experience,
        message,
        privacyPolicy
      };

      const result = await submitDistributorContact(contactData);
      
      res.status(201).json({
        success: true,
        message: 'Distributor contact form submitted successfully',
        data: result
      });
    } catch (error) {
      console.error('Error in submitDistributorContact:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to submit distributor contact form',
        error: error.message
      });
    }
  },

  // Get all distributor contacts (admin only)
  getDistributorContacts : async (req, res) => {
    try {
 
      // const userId  = req.user._id;
      // const { search, startDate, endDate, sortBy, sortOrder, page = 1, limit = 10 } = req.query;
      
      // const filters = {
      //   ...(search && { search }),
      //   ...(startDate && { startDate }),
      //   ...(endDate && { endDate }),
      //   ...(sortBy && { sortBy }),
      //   ...(sortOrder && { sortOrder }),
      //   page: parseInt(page),
      //   limit: parseInt(limit)
      // };

      const result = await getDistributorContacts();
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('Error in getDistributorContacts:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch distributor contacts',
        error: error.message
      });
    }
  },

};
