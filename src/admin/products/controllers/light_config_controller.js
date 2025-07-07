const lightConfigService = require('../services/light_config_services');
const { validationResult } = require('express-validator');


class LightConfigController {
  async createConfig(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Get user_id from request body (already validated by middleware)
      const { user_id, ...rest } = req.body;
      
      // Prepare config data
      const configData = {
        ...rest,
        user_id
      };
      
      const config = await lightConfigService.createConfig(configData);
      res.status(201).json(config);
    } catch (error) {
      console.error('Error in createConfig:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async getConfig(req, res) {
    try {
      const { id } = req.params;
      const { filter } = req.query;
      const config = await lightConfigService.getConfigById(id);
      
      if (!config) {
        return res.status(404).json({ message: 'Configuration not found' });
      }
      
      // If filter=true is in query, only return light_type and name
      if (filter === 'true') {
        const filteredResponse = {
          name: config?.name,
          light_type: config?.config?.light_type,
          download_Id : config?.config?.download_Id,         
        };
        return res.json(filteredResponse);
      }
      
      // Otherwise return the full config
      res.json(config);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserConfigs(req, res) {
    try {
      const {userId} = req.body; // Get user ID from authenticated user
      const configs = await lightConfigService.getConfigsByUser(userId);
      res.json(configs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateConfig(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const updatedConfig = await lightConfigService.updateConfig(id, updateData);
      
      if (!updatedConfig) {
        return res.status(404).json({ message: 'Configuration not found' });
      }
      
      res.json(updatedConfig);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteConfig(req, res) {
    try {
      const { id } = req.params;
      const deletedConfig = await lightConfigService.deleteConfig(id);
      
      if (!deletedConfig) {
        return res.status(404).json({ message: 'Configuration not found' });
      }
      
      res.json({ message: 'Configuration deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * @route   GET /api/products/light-configs
   * @desc    Get all light configurations
   * @access  Public
   */
  async getAllConfigs(req, res) {
    try {
      const configs = await lightConfigService.getAllConfigs();
      
      res.json({
        success: true,
        data: configs
      });
    } catch (error) {
      console.error('Error in getAllConfigs:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Error fetching light configurations'
      });
    }
  }
}

module.exports = new LightConfigController();
