const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user_model');
const Contact = require('../models/contact_model');
const DistributorContact = require('../models/distributor_contact_model');
const { uploadToCloudinary, deleteFromCloudinary } = require('../../../utils/cloudinary');

module.exports = {
  // signupService: async (req) => {
  //   const { name, email, password } = req.body;
  //   if (!name || !email || !password) {
  //     throw new Error("All fields are required");
  //   }
  //   const existingUser = await User.findOne({ email });
  //   if (existingUser) throw new Error("User already exists");

  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const user = new User({
  //     name,
  //     email,
  //     password: hashedPassword,
  //   });
  //   await user.save();
  //   return { success: true, message: "User created successfully" };
  // },

  updateProfilePictureService: async (userId, file) => {
    try {
    // Delete old profile picture if exists
     const user = await User.findById(userId);
     console.log(user);
      if (user.profilePicture?.public_id) {
      await deleteFromCloudinary(user.profilePicture.public_id);
      } 
//sdsdf
      // Upload new profile picture
      const result = await uploadToCloudinary(file, 'user_profile_pictures');

      // Update user with new profile picture
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          profilePicture: {
            url: result.url,
            public_id: result.public_id
          }
        },
        { new: true }
      );

      return {
        success: true,
        message: 'Profile picture updated successfully',
        profilePicture: updatedUser.profilePicture
      };
    } catch (error) {
      console.error('Error updating profile picture:', error);
      throw new Error('Failed to update profile picture');
    }
  },

  updateProfileService: async (userId, profileData) => {
    // profileData can contain phone, address, paymentMethods, and password
    const update = {};
    
    // Handle password update if provided
    if (profileData.password) {
      // Get the current user to check existing password
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
      
      // Check if the new password is different from the current one
      const isSamePassword = await bcrypt.compare(profileData.password, user.password);
      
      // Only update if the password is different
      if (!isSamePassword) {
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(profileData.password, salt);
      }
      // If passwords are the same, we'll just skip the password update
    }
    
    // Handle other profile updates
    if(profileData.email) update.email = profileData.email;
    if (profileData.username) update.username = profileData.username;
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

  // loginService: async (req) => {
  //   const { email, password } = req.body;
  //   if ((!email, !password)) {
  //     throw new Error("All fields are required");
  //   }
  //   const user = await User.findOne({ email });
  //   if (!user) throw new Error("Invalid credentials");

  //   const isMatch = await bcrypt.compare(password, user.password);
  //   if (!isMatch) throw new Error("Invalid credentials");

  //   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  //     expiresIn: "7d",
  //   });
  //   return { success: true, token };
  // },

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

  getUserProfileService: async (userId) => {
    // editred 
    return await User.findById(userId).select('-password');
  },

  removeProfilePictureService: async (userId) => {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    // If no profile picture exists, return early
    if (!user.profilePicture?.public_id) {
      return { success: true, message: 'No profile picture to remove' };
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(user.profilePicture.public_id);

    // Remove from user document
    user.profilePicture = undefined;
    await user.save();

    return { 
      success: true, 
      message: 'Profile picture removed successfully' 
    };
  },

  // Contact Us services
  submitContactFormService: async (contactData) => {
    try {
      const { userId, name, email, subject, message } = contactData;
      
      const newContact = new Contact({
        userId,
        name,
        email,
        subject,
        message
      });
      
      await newContact.save();
      return newContact;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw new Error('Failed to save your message. Please try again.');
    }
  },
  
  getContactMessagesService: async (userId) => {
    try {
      
      if (!userId) {
        throw new Error('User ID is required');
      }
      
      // Only fetch messages for the specified user
      const messages = await Contact.find({ userId })
        .sort({ createdAt: -1 })
        .lean();
      
      return messages;
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      throw new Error('Failed to retrieve messages');
    }
  },
  
// Distributor Contact Services
submitDistributorContact: async (contactData) => {
  try {
    const newContact = new DistributorContact(contactData);
    await newContact.save();
    return newContact;
  } catch (error) {
    console.error('Error in submitDistributorContact:', error);
    throw new Error('Failed to submit distributor contact form');
  }
},

getDistributorContacts: async (userId) => {
  try {
    
    const contacts = await DistributorContact.find({ userId : userId});
    return contacts;

    // const query = {};
     
    // // Add search filters if provided
    // if (filters.search) {
    //   query.$or = [
    //     { name: { $regex: filters.search, $options: 'i' } },
    //     { company: { $regex: filters.search, $options: 'i' } },
    //     { email: { $regex: filters.search, $options: 'i' } },
    //     { phoneNumber: { $regex: filters.search, $options: 'i' } }
    //   ];
    // }
    
    // // Add date range filter if provided
    // if (filters.startDate || filters.endDate) {
    //   query.createdAt = {};
    //   if (filters.startDate) query.createdAt.$gte = new Date(filters.startDate);
    //   if (filters.endDate) {
    //     const endDate = new Date(filters.endDate);
    //     endDate.setHours(23, 59, 59, 999);
    //     query.createdAt.$lte = endDate;
    //   }
    // }
    
    // // Build sort options
    // const sortOptions = {};
    // if (filters.sortBy) {
    //   sortOptions[filters.sortBy] = filters.sortOrder === 'desc' ? -1 : 1;
    // } else {
    //   sortOptions.createdAt = -1; // Default sort by newest first
    // }
    
    // // Execute query with pagination
    // const page = parseInt(filters.page, 10) || 1;
    // const limit = parseInt(filters.limit, 10) || 10;
    // const skip = (page - 1) * limit;
    
    // const [contacts, total] = await Promise.all([
    //   DistributorContact.find(query)
    //     .sort(sortOptions)
    //     .skip(skip)
    //     .limit(limit)
    //     .lean(),
    //   DistributorContact.countDocuments(query)
    // ]);


    
    // return {
    //   data: contacts,
    //   pagination: {
    //     total,
    //     page,
    //     pages: Math.ceil(total / limit),
    //     limit
    //   }
    // };
  } catch (error) {
    console.error('Error in getDistributorContacts:', error);
    throw new Error('Failed to fetch distributor contacts');
  }
}

}
