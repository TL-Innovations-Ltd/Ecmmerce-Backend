const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(
      authHeader,
      process.env.JWT_SECRET || 'yoursecretkey',
    );
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authUser;
