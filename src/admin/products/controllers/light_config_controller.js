const lightConfigService = require('../services/light_config_services');
const { validationResult } = require('express-validator');


class LightConfigController {
  async createConfig(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Get user_id from the authenticated user
      const user_id = req.user.userId; // User ID is stored in req.user.userId by the auth middleware
      
      if (!user_id) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      
      const configData = {
        ...req.body,
        user_id // Add user_id from the authenticated user
      };
      
      const config = await lightConfigService.createConfig(configData);
      res.status(201).json(config);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getConfig(req, res) {
    try {
      const { id } = req.params;
      const config = await lightConfigService.getConfigById(id);
      
      if (!config) {
        return res.status(404).json({ message: 'Configuration not found' });
      }
      
      res.json(config);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserConfigs(req, res) {
    try {
      const userId = req.user.userId; // Get user ID from authenticated user
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
}

module.exports = new LightConfigController();
