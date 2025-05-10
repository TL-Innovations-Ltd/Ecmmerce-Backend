const Slideshow = require('../models/slides_show_model');

class SlideshowService {
  // Create or Update Slideshow
  async createOrUpdateSlideshow(slideshowData) {
    try {
      const { _id, ...updateData } = slideshowData;
      
      if (_id) {
        // Update existing slideshow
        const updatedSlideshow = await Slideshow.findByIdAndUpdate(
          _id, 
          { ...updateData, updatedAt: new Date() }, 
          { new: true, upsert: true }
        );
        return updatedSlideshow;
      } else {
        // Create new slideshow
        const newSlideshow = new Slideshow(updateData);
        await newSlideshow.save();
        return newSlideshow;
      }
    } catch (error) {
      throw new Error(`Error creating/updating slideshow: ${error.message}`);
    }
  }

  // Get Slideshow by ID
  async getSlideshowById(id) {
    try {
      const slideshow = await Slideshow.findById(id);
      if (!slideshow) {
        throw new Error('Slideshow not found');
      }
      return slideshow;
    } catch (error) {
      throw new Error(`Error retrieving slideshow: ${error.message}`);
    }
  }

  // Get Slideshows by Customer ID
  async getSlideshowsByCustomerId(customerId) {
    try {
      const slideshows = await Slideshow.find({ customerId });
      return slideshows;
    } catch (error) {
      throw new Error(`Error retrieving slideshows: ${error.message}`);
    }
  }

  // Delete Slideshow
  async deleteSlideshow(id) {
    try {
      const deletedSlideshow = await Slideshow.findByIdAndDelete(id);
      if (!deletedSlideshow) {
        throw new Error('Slideshow not found');
      }
      return deletedSlideshow;
    } catch (error) {
      throw new Error(`Error deleting slideshow: ${error.message}`);
    }
  }
}

module.exports = new SlideshowService();