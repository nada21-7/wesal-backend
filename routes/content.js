const express = require('express');
const router = express.Router();
const { body, param, query, validationResult } = require('express-validator'); 
const contentController = require('../controllers/contentController');
const authMiddleware = require('../middleware/auth');

router.get('/', contentController.welcomeMessage); 

router.get(
  '/items',
  authMiddleware,
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('filter').optional().isString().withMessage('Filter must be a string')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  contentController.listContentItems
);

router.post(
  '/items',
  authMiddleware,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional().isString().withMessage('Description must be a string')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  contentController.createContentItem
);

router.get(
  '/items/:id',
  authMiddleware,
  [param('id').isMongoId().withMessage('Invalid ID')],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  contentController.getContentItem
);

router.put(
  '/items/:id',
  authMiddleware,
  [
    param('id').isMongoId().withMessage('Invalid ID'),
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().isString().withMessage('Description must be a string')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  contentController.updateContentItem
);

router.delete(
  '/items/:id',
  authMiddleware,
  [param('id').isMongoId().withMessage('Invalid ID')],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  contentController.deleteContentItem
);

module.exports = router;