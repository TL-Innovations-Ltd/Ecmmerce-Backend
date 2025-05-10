const SlideshowService = require('../services/slides_show_services');

class SlideshowController {
  // Create or Update Slideshow
  async createOrUpdateSlideshow(req, res) {
    try {
      const slideshowData = req.body;
      const slideshow = await SlideshowService.createOrUpdateSlideshow(slideshowData);
      
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
}

module.exports = new SlideshowController();