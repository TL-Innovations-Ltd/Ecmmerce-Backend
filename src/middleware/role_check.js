const User = require('../client/user/models/user_model');

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user has admin role
    if (user.roles !== 'superadmin' && user.roles !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    next();
  } catch (error) {
    console.error('Error in isAdmin middleware:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while checking user role'
    });
  }
};

module.exports = {
  isAdmin
};
