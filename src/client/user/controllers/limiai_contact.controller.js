const { submitLimiaiContact, getLimiaiContacts } = require('../services/limiai_contact.service');

module.exports = {
  // POST /client/limiai_contact
  submit: async (req, res) => {
    try {
      const { name, email, company } = req.body;

      if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
      }

      await submitLimiaiContact({ name, email, company });
      return res.status(201).json({ success: true, message: 'Contact saved. Email sent to user.' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /client/limiai_contact
  list: async (_req, res) => {
    try {
      const list = await getLimiaiContacts();
      return res.status(200).json({ success: true, data: list });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};
