const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
//asdasd
const uploadToCloudinary = async (file, folder = 'user_profile_pictures') => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    // Create folder if it doesn't exist
    const uploadDir = path.dirname(file.path);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: folder,
      resource_type: 'auto',
    });

    // Delete the temporary file
    fs.unlinkSync(file.path);

    return {
      url: result.secure_url,
      public_id: result.public_id
    };
  } catch (error) {
    // Clean up the temporary file if it exists
    if (file?.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return;
    
    // Extract the public ID without the folder path
    const publicIdWithoutFolder = publicId.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicIdWithoutFolder, {
      resource_type: 'image',
      invalidate: true
    });
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary
};
