// const express = require('express');
// const router = express.Router();
// const { body, validationResult } = require('express-validator'); 
// const trainingController = require('../controllers/trainingController');
// const { upload } = require('../services/media-storage'); 
// const authMiddleware = require('../middleware/auth');

// router.post(
//   '/',
//   authMiddleware,
//   upload.single('dataFile'), 
//   [
//     body('modelType').optional().isIn(['sign_language', 'other']), 
//   ],
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     if (!req.file) { 
//       return res.status(400).json({ error: 'No data file uploaded' });
//     }
//     next();
//   },
//   trainingController.startTrainingJob
// );

// module.exports = router;


const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator'); 
const trainingController = require('../controllers/trainingController');
const { upload } = require('../services/media-storage'); 
const authMiddleware = require('../middleware/auth');

router.post(
  '/',
  authMiddleware,
  upload.single('trainingData'), 
  [
    body('modelType').optional().isIn(['sign_language', 'other']), 
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.file) { 
      return res.status(400).json({ error: 'No data file uploaded (Expected key: trainingData)' });
    }
    next();
  },
  trainingController.startTrainingJob
);

module.exports = router;
