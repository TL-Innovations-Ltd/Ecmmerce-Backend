const SlideshowService = require('../services/slides_show_services');

class SlideshowController {
  // Create or Update Slideshow
  async createOrUpdateSlideshow(req, res) {
    try {
      const slideshow = await SlideshowService.createOrUpdateSlideshow(req.body);
      
      res.status(200).json({
        success: true,
        data: slideshow
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get Slideshow by ID
  async getSlideshowById(req, res) {
    try {
      const { id } = req.params;
      const slideshow = await SlideshowService.getSlideshowById(id);
      
      res.status(200).json({
        success: true,
        data: slideshow
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get Slideshows by Customer ID
  async getSlideshowsByCustomerId(req, res) {
    try {
      const { customerId } = req.params;
      const slideshows = await SlideshowService.getSlideshowsByCustomerId(customerId);
      
      res.status(200).json({
        success: true,
        data: slideshows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Delete Slideshow
  async deleteSlideshow(req, res) {
    try {
      const { id } = req.params;
      await SlideshowService.deleteSlideshow(id);

      await clearCache('slideshows', id);
      
      res.status(200).json({
        success: true,
        message: 'Slideshow deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

    // Upload Media to Cloudinary
    async uploadMedia(req, res) {
      try {
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ 
            success: false, 
            message: 'No files uploaded' 
          });
        }
        
        const uploadResults = await SlideshowService.uploadMediaToCloudinary(req.files);
        
        res.status(200).json({
          success: true,
          data: uploadResults,
        });
      } catch (error) {
        res.status(500).json({ 
          success: false, 
          message: `Error uploading files: ${error.message}` 
        });
      }
    }

    async uploadTesting(req, res) {
      try {
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ 
            success: false, 
            message: 'No files uploaded' 
          });
        }
        
        const uploadResults = await SlideshowService.uploadMediaToTesting(req.files);
        
        res.status(200).json({
          success: true,
          data: uploadResults,
        });
      } catch (error) {
        res.status(500).json({ 
          success: false, 
          message: `Error uploading files: ${error.message}` 
        });
      }
    }

    // Get All Slideshows Images
    async getAllSlideshowsImages(req, res) {
      try {
        const slideshows = await SlideshowService.getAllSlideshowsImages();
        
        res.status(200).json({
          success: true,
          data: slideshows,
        });
      } catch (error) {
        res.status(500).json({ 
          success: false, 
          message: `Error retrieving slideshows: ${error.message}` 
        });
      }
    }

    // Get Limit Bussiness Card Images
    async getLimitBussinessCardImages(req, res) {
      try {
        const slideshows = await SlideshowService.getLimitBussinessCardImages();
        
        res.status(200).json({
          success: true,
          data: slideshows,
        });
      } catch (error) {
        res.status(500).json({ 
          success: false, 
          message: `Error retrieving slideshows: ${error.message}` 
        });
      }
    }

    // Get All Products Images
    async getAllProductsImages(req, res) {
      try {
        const slideshows = await SlideshowService.getAllProductsImages();
        
        res.status(200).json({
          success: true,
          data: slideshows,
        });
      } catch (error) {
        res.status(500).json({ 
          success: false, 
          message: `Error retrieving slideshows: ${error.message}` 
        });
      }
    }
}

module.exports = new SlideshowController();