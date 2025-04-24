const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user_model');

module.exports = {
  signupService: async (req) => {
    const {
      name, email, password, phone, address,
    } = req.body;
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });
    await user.save();
    return { success: true, message: 'User created successfully' };
  },

  loginService: async (req) => {
    const { email, password } = req.body;
    if ((!email, !password)) {
      throw new Error('All fields are required');
    }
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    return { success: true, token };
  },
};
