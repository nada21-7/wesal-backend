const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');


module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('No token provided or invalid format');
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(' ')[1];

  try {
  
    const decoded = jwt.verify(token, jwtSecret, { algorithms: ['HS256'] });

   
    if (!decoded.id) { 
      throw new Error('Invalid token payload');
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth error:', error.message); 
    const authError = new Error('Invalid or expired token');
    authError.statusCode = 401;
    next(authError);
  }
};
