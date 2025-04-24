const { signupService, loginService } = require('../services/services');

module.exports = {
  signup: async (req, res) => {
    try {
      const result = await signupService(req);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const result = await loginService(req);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
