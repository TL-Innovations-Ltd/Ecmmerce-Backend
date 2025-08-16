const { submitStartJourney, getStartJourneySubmissions } = require('../services/start_journey.service');

module.exports = {
  // POST /client/start_journey
  submit: async (req, res) => {
    try {
      const { name, email, company } = req.body;

      if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name and email are required' });
      }

      const result = await submitStartJourney({ name, email, company });
      return res.status(201).json({ success: true, message: 'Submission received. Email sent to user.'});
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /client/start_journey
  list: async (_req, res) => {
    try {
      const list = await getStartJourneySubmissions();
      return res.status(200).json({ success: true, data: list });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};
