const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator'); 
const contactController = require('../controllers/contactController');
const rateLimit = require('express-rate-limit'); 

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: 'Too many requests, please try again later.'
});

router.post(
  '/',
  limiter, 
  [
    body('name').custom((value) => require('../utils/validation').isValidName(value)).withMessage('Invalid name'), 
    body('email').custom((value) => require('../utils/validation').isValidEmail(value)).withMessage('Invalid email'), 
    body('message').custom((value) => require('../utils/validation').isValidMessage(value)).withMessage('Invalid message') 
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  contactController.sendContactMessage
);

module.exports = router;
