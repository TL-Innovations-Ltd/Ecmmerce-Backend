const Slideshow = require('../models/slides_show_model');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const axios = require('axios');

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


// Helper function to upload files to Cloudinary
async function uploadMediaToCloudinary(files) {
  const uploadPromises = files.map(file =>
    cloudinary.uploader.upload(file.path, {
      folder: 'slideshows',
      resource_type: 'auto' // Auto-detect if it's an image or video
    })
  );

  const results = await Promise.all(uploadPromises);

  // Delete local files after upload
  files.forEach(file => {
    fs.unlink(file.path, err => {
      if (err) console.error('Error deleting file:', file.path, err);
    });
  });

  return results;
}

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
      // Delete the slideshow from database
      const slideshow = await Slideshow.findByIdAndDelete(id);
      if (!slideshow) {
        throw new Error('Slideshow not found');
      }  
      return true;
    } catch (error) {
      throw new Error(`Error deleting slideshow: ${error.message}`);
    }
  }

   // Expose the uploadMediaToCloudinary function as a service method
   async uploadMediaToCloudinary(files) {
    try {
      const results = await uploadMediaToCloudinary(files);
      
      // Format the results to return only the necessary information
      return results.map(result => ({
        url: result.secure_url,
        public_id: result.public_id,
      }));
    } catch (error) {
      throw new Error(`Error uploading media to Cloudinary: ${error.message}`);
    }
  }

  // Get All Slideshows Images
  async getAllSlideshowsImages() {
     
    const response = await axios.get(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/upload?prefix=slideshows`,
      {
        params: {
          prefix: 'slideshows/',
          max_results: 500,
        },
        auth: {
          username: process.env.CLOUDINARY_API_KEY,
          password: process.env.CLOUDINARY_API_SECRET,
        },
      }
    );

    return response.data;

  }

  // Get Limit Bussiness Card Images
  async getLimitBussinessCardImages() {
    const response = await axios.get(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/upload?prefix=limi-business-cards`,
      {
        params: {
          prefix: 'limi-business-cards/',
          max_results: 500,
        },
        auth: {
          username: process.env.CLOUDINARY_API_KEY,
          password: process.env.CLOUDINARY_API_SECRET,
        },
      }
    );

    return response.data;
  }

  // Get All Products Images
  async getAllProductsImages() {
    const response = await axios.get(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/upload?prefix=products`,
      {
        params: {
          prefix: 'products/',
          max_results: 500,
        },
        auth: {
          username: process.env.CLOUDINARY_API_KEY,
          password: process.env.CLOUDINARY_API_SECRET,
        },
      }
    );

    return response.data;
  }
  

}

module.exports = new SlideshowService();