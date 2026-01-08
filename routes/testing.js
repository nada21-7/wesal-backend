// const express = require('express');
// const router = express.Router();
// const { body, validationResult } = require('express-validator');
// const testingController = require('../controllers/testingController');
// const authMiddleware = require('../middleware/auth');

// router.get(
//   '/',
//   authMiddleware,
//   testingController.getAvailableTests
// );

// router.post(
//   '/submit',
//   authMiddleware,
//   [
//     body('testId').isMongoId().withMessage('Invalid test ID'), 
//     body('answers').isArray({ min: 1 }).withMessage('Answers must be a non-empty array'),
//     body('answers.*.questionId').isMongoId(), 
//     body('answers.*.selectedOption').isString().notEmpty()
//   ],
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   },
//   testingController.submitUserTest
// );

// module.exports = router;

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const testingController = require('../controllers/testingController');
const authMiddleware = require('../middleware/auth');

router.get(
  '/',
  authMiddleware,
  testingController.getAvailableTests
);

router.post(
  '/submit',
  authMiddleware,
  [
    body('testId').isMongoId().withMessage('Invalid test ID'), 
    
    body('frame').notEmpty().withMessage('Image frame is required'),
    
    body('expectedChar').isString().notEmpty().withMessage('Expected character is required')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  testingController.submitUserTest
);

module.exports = router;


