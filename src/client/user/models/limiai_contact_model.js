const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
   company: {
    type: String
   }
}, {
  timestamps: true
});

module.exports = mongoose.model('LimiaiContact', contactSchema);
