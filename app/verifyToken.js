const jwt = require('jsonwebtoken');
const { createError } = require('./error.js');

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(createError(401, 'You are not authenticated!'));

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.userId = decoded.id; // Set the user ID in the request object for further processing
    next();
  } catch (err) {
    return next(createError(403, 'Token is not valid!'));
  }
};

module.exports = { verifyToken };
