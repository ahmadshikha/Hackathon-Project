const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_ERROR } = require('../Constants/Event/ErrorMessages');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: UNAUTHORIZED_ERROR });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired. Please log in again.' });
      }
      return res.status(401).json({ error: UNAUTHORIZED_ERROR });
    }
  };
  
  module.exports = authMiddleware;