const { sendBrochureEmail , Brochure_Email_Service } = require('../services/brochure.service');

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
  },

  getBrochureRequests: async (req, res) => {
    try {
      const brochureRequests = await Brochure_Email_Service();
      return res.status(200).json({ success: true, data: brochureRequests });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message || 'Failed to retrieve brochure requests' });
    }
  }
};
