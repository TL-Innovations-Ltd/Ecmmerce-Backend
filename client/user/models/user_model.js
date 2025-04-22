const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    roles: {
      type: String,
      default: 'user',
      enum: ['user', 'superadmin', 'managers', 'wholesaler'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
