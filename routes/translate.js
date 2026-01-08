const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const translateController = require('../controllers/translateController');
const { upload } = require('../services/media-storage'); 
const authMiddleware = require('../middleware/auth');

router.post(
  '/',
  authMiddleware,
  upload.single('video'), 
  [
    body('language').optional().isIn(['ar', 'en']),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  translateController.processTranslation
);
/////////////////////////////////////////
router.post('/frame', authMiddleware, translateController.translateFrame);
module.exports = router;
