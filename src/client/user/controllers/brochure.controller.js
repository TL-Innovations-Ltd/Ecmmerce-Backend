const { sendBrochureEmail } = require('../services/brochure.service');

module.exports = {
  requestBrochure: async (req, res) => {
    try {
      const { email} = req.body;

      if (!email) {
        return res.status(400).json({ success: false, message: 'Valid email is required' });
      }

      const result = await sendBrochureEmail(email);

      return res.status(201).json({ success: true, message: 'Brochure email sent', data: result });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message || 'Failed to send brochure' });
    }
  }
};
