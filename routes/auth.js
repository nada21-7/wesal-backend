const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts, please try again later.'
});

router.post(
  '/register',
  [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('age').isInt({ min: 13, max: 120 }).withMessage('Age must be between 13 and 120'), 
    body('gender').isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'), 
    body('email').custom((value) => require('../utils/validation').isValidEmail(value)).withMessage('Invalid email'),
    body('password').custom((value) => require('../utils/validation').isStrongPassword(value)).withMessage('Password must be strong')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authController.register
);

router.post(
  '/login',
  loginLimiter,
  [
    body('email').custom((value) => require('../utils/validation').isValidEmail(value)).withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authController.login
);

module.exports = router;

