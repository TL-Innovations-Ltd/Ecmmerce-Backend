const LightConfig = require('../models/light_config_model');
const mongoose = require('mongoose');
class LightConfigService {
  /**
   * Validate thumbnail URL
   * @param {string} url - URL to validate
   * @returns {boolean} True if URL is valid
   */
  isValidThumbnail(thumbnail) {
    if (!thumbnail) return false;
    // If thumbnail is a string, check if it's a valid URL
    if (typeof thumbnail === 'string') {
      try {
        new URL(thumbnail);
        return true;
      } catch (e) {
        return false;
      }
    }
    // If thumbnail is an object, check if it has a valid URL
    if (thumbnail && typeof thumbnail === 'object' && thumbnail.url) {
      try {
        new URL(thumbnail.url);
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  /**
   * Create a new light configuration
   * @param {Object} configData - Configuration data
   * @returns {Promise<Object>} The created configuration
   */
  async createConfig(configData) {
    try {
      // Prepare the config object
      const configObj = {
        name: configData.name,
        thumbnail: {
          url: configData.thumbnail?.url || '',
          public_id: configData.thumbnail?.public_id || ''
        },
        config: configData.config, // Use the config as-is since it's now Mixed type
        iframe: Array.isArray(configData.iframe) ? configData.iframe : [],
        user_id: configData.user_id
      };
      
      const config = new LightConfig(configObj);
      const savedConfig = await config.save();
      return savedConfig;
    } catch (error) {
      throw new Error(`Failed to create configuration: ${error.message}`);
    }
  }

  /**
   * Get a configuration by ID
   * @param {string} id - Configuration ID
   * @returns {Promise<Object>} The configuration
   */
  async getConfigById(id) {
    try {
      return await LightConfig.findOne({ _id: id });
    } catch (error) {
      throw new Error(`Error fetching light config: ${error.message}`);
    }
  }

  /**
   * Get all configurations for a user
   * @param {string} userId - User ID
   * @returns {Promise<Array>} List of configurations
   */
  async getConfigsByUser(userId) {
    try {
      return await LightConfig.find({ user_id: userId }).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Error fetching user's light configs: ${error.message}`);
    }
  }

  /**
   * Get all light configurations
   * @returns {Promise<Array>} List of configurations
   */
  async getAllConfigs() {
    try {
   
   
      
      // Get all matching configs
      const configs = await LightConfig.find({}).sort({ createdAt: -1 }).lean();
      
      return configs;
    } catch (error) {
      throw new Error(`Error fetching light configurations: ${error.message}`);
    }
  }

  /**
   * Update a configuration
   * @param {string} id - Configuration ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated configuration
   */
  async updateConfig(id, updateData) {
    const session = await LightConfig.startSession();
    session.startTransaction();

    try {
      const config = await LightConfig.findById(id).session(session);

      if (!config) {
        throw new Error('Configuration not found');
      }

      // Validate thumbnail if provided
      if (updateData.thumbnail && !this.isValidThumbnail(updateData.thumbnail)) {
        throw new Error('Invalid thumbnail format. Must be a valid URL or object with url property');
      }

      // Prepare update object
      const updateObj = {
        name: updateData.name || config.name,
        // Handle thumbnail update - keep existing if not provided
        thumbnail: updateData.thumbnail 
          ? (typeof updateData.thumbnail === 'string' 
              ? { url: updateData.thumbnail, public_id: '' } 
              : updateData.thumbnail)
          : config.thumbnail,
        config: {
          lightType: updateData.config?.lightType || config.config?.lightType || 'ceiling',
          pendantCount: updateData.config?.pendantCount !== undefined 
            ? updateData.config.pendantCount 
            : (config.config?.pendantCount || 0),
          cableColor: updateData.config?.cableColor || config.config?.cableColor || 'black',
          cableLength: updateData.config?.cableLength || config.config?.cableLength || '1m',
          pendantDesigns: updateData.config?.pendantDesigns || config.config?.pendantDesigns || []
        },
        iframe: updateData.iframe || config.iframe || {},
        updatedAt: new Date()
      };

      const updatedConfig = await LightConfig.findByIdAndUpdate(
        id,
        updateObj,
        { new: true, session }
      );

      await session.commitTransaction();
      return updatedConfig;
    } catch (error) {
      await session.abortTransaction();
      throw new Error(`Error updating light config: ${error.message}`);
    } finally {
      session.endSession();
    }
  }

  /**
   * Delete a configuration
   * @param {string} id - Configuration ID
   * @returns {Promise<Object>} Deleted configuration
   */
  async deleteConfig(id) {
    const session = await LightConfig.startSession();
    session.startTransaction();

    try {
      const config = await LightConfig.findById(id).session(session);
      if (!config) {
        throw new Error('Configuration not found');
      }

      // No need to delete remote URLs, just validate if needed
      if (config.thumbnail && !this.isValidThumbnail(config.thumbnail)) {
        console.warn('Skipping cleanup of invalid thumbnail URL:', config.thumbnail);
      }

      // Delete the config
      const result = await LightConfig.findByIdAndDelete(id).session(session);

      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw new Error(`Error deleting light config: ${error.message}`);
    } finally {
      session.endSession();
    }
  }
}

module.exports = new LightConfigService();
