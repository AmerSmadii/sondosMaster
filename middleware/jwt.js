const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    console.log(req.headers)
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const secretKey = process.env.SECRET_KEY;
    console.log("Token and Secret:", token, secretKey);
    console.log("scoscms",token, secretKey);
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach the decoded user information to the request object
    next();
  } catch (error) {
    console.error('Error decoding token:', error);
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

  
module.exports = authenticateToken;
