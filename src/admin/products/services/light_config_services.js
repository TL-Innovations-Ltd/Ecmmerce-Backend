const LightConfig = require('../models/light_config_model');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


class LightConfigService {
   
  async uploadBase64Image(base64Data, folder = 'web_configurator') {
    try {
      // Remove data URL prefix if present
      const base64Image = base64Data.split(';base64,').pop();
      
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${base64Image}`,
        {
          folder: folder,
          resource_type: 'auto',
          format: 'webp',
          quality: 'auto'
        }
      );

      return {
        url: result.secure_url,
        public_id: result.public_id
      };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw new Error('Failed to upload image to Cloudinary');
    }
  }

  async deleteCloudinaryImage(publicId) {
    try {
      if (!publicId) return;
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      // Don't throw error to prevent deletion failure if image delete fails
    }
  }

  async createConfig(configData) {
    const session = await LightConfig.startSession();
    session.startTransaction();

    try {
      const { thumbnail, ...restData } = configData;
      let thumbnailData = null;

      // Upload thumbnail if provided
      if (thumbnail) {
        thumbnailData = await this.uploadBase64Image(thumbnail);
      }

      const config = new LightConfig({
        ...restData,
        thumbnail: thumbnailData
      });

      const savedConfig = await config.save({ session });
      await session.commitTransaction();
      session.endSession();

      return savedConfig;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error(`Error creating light config: ${error.message}`);
    }
  }

  async getConfigById(id) {
    try {
      return await LightConfig.findOne({ _id: id });
    } catch (error) {
      throw new Error(`Error fetching light config: ${error.message}`);
    }
  }

  async getConfigsByUser(userId) {
    try {
      return await LightConfig.find({ user_id: userId }).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Error fetching user's light configs: ${error.message}`);
    }
  }

  async updateConfig(id, updateData) {
    const session = await LightConfig.startSession();
    session.startTransaction();

    try {
      const { thumbnail, ...restData } = updateData;
      const config = await LightConfig.findById(id).session(session);

      if (!config) {
        throw new Error('Configuration not found');
      }

      // Handle thumbnail update if new thumbnail is provided
      if (thumbnail) {
        // Delete old thumbnail if exists
        if (config.thumbnail?.public_id) {
          await this.deleteCloudinaryImage(config.thumbnail.public_id);
        }
        // Upload new thumbnail
        const thumbnailData = await this.uploadBase64Image(thumbnail);
        restData.thumbnail = thumbnailData;
      }

      const updatedConfig = await LightConfig.findByIdAndUpdate(
        id,
        { ...restData, updatedAt: new Date() },
        { new: true, session }
      );

      await session.commitTransaction();
      session.endSession();

      return updatedConfig;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error(`Error updating light config: ${error.message}`);
    }
  }

  async deleteConfig(id) {
    const session = await LightConfig.startSession();
    session.startTransaction();

    try {
      const config = await LightConfig.findById(id).session(session);
      if (!config) {
        throw new Error('Configuration not found');
      }

      // Delete thumbnail from Cloudinary if exists
      if (config.thumbnail?.public_id) {
        await this.deleteCloudinaryImage(config.thumbnail.public_id);
      }

      // Delete the config
      const result = await LightConfig.findByIdAndDelete(id).session(session);

      await session.commitTransaction();
      session.endSession();

      return result;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error(`Error deleting light config: ${error.message}`);
    }
  }
}

module.exports = new LightConfigService();
