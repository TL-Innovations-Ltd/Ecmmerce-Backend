const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

module.exports = {
  signupService: async (req) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    return { success: true, message: "User created successfully" };
  },

   updateProfileService: async (userId, profileData) => {
    // profileData can contain phone, address, and paymentMethods
    const update = {};
    if (profileData.phone) update.phone = profileData.phone;
    if (profileData.address && typeof profileData.address === 'object') {
      update.address = {
        fullName: profileData.address.fullName,
        phone: profileData.address.phone,
        street: profileData.address.street,
        city: profileData.address.city,
        state: profileData.address.state,
        postalCode: profileData.address.postalCode,
        country: profileData.address.country,
      };
    }
    if (Array.isArray(profileData.paymentMethods)) {
      update.paymentMethods = profileData.paymentMethods.map(pm => ({
        cardType: pm.cardType,
        cardHolder: pm.cardHolder,
        cardNumber: pm.cardNumber,
        expiryDate: pm.expiryDate,
        cvv: pm.cvv,
      }));
    }
    // Notification preferences
    if (typeof profileData.emailNotification === 'boolean') update.emailNotification = profileData.emailNotification;
    if (typeof profileData.smsNotification === 'boolean') update.smsNotification = profileData.smsNotification;
    if (typeof profileData.appNotification === 'boolean') update.appNotification = profileData.appNotification;
    const user = await User.findByIdAndUpdate(userId, update, { new: true });
    if (!user) throw new Error("User not found");
    return { success: true, message: "Profile updated successfully" };
  },

  loginService: async (req) => {
    const { email, password } = req.body;
    if ((!email, !password)) {
      throw new Error("All fields are required");
    }
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return { success: true, token };
  },

  // Add to favorites
  addFavoriteService: async (userId, productId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.favorites.includes(productId)) {
      throw new Error("Product already in favorites");
    }
    user.favorites.push(productId);
    await user.save();
    return { success: true, message: "Product added to favorites" };
  },

  // Remove from favorites
  removeFavoriteService: async (userId, productId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    user.favorites = user.favorites.filter(
      (favId) => favId.toString() !== productId,
    );
    await user.save();
    return { success: true, message: "Product removed from favorites" };
  },

  getUserProfileService : async (userId) => {
    const user = await User.findById(userId).select('name email');
    if (!user) throw new Error("User not found");
    return user;
  },
};
