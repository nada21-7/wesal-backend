// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middleware/auth');
// const mongoose = require('mongoose');


// const TestResult = mongoose.model('TestResult');
// const Translation = mongoose.model('Translation');
// const TrainingResult = mongoose.model('TrainingResult');


// const getPaginatedResults = async (Model, userId, page = 1, limit = 10) => {
//   const skip = (page - 1) * limit;
//   const results = await Model.find({ userId })
//     .sort({ createdAt: -1 }) 
//     .skip(skip)
//     .limit(limit)
//     .lean(); 

//   const total = await Model.countDocuments({ userId });
//   return {
//     results,
//     page,
//     totalPages: Math.ceil(total / limit),
//     hasMore: results.length === limit
//   };
// };


// router.get('/tests', authMiddleware, async (req, res, next) => {
//   const userId = req.user.id;
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;

//   try {
//     const data = await getPaginatedResults(TestResult, userId, page, limit);
//     res.json({
//       type: 'tests',
//       ...data
//     });
//   } catch (error) {
//     next(error);
//   }
// });


// router.get('/translations', authMiddleware, async (req, res, next) => {
//   const userId = req.user.id;
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;

//   try {
//     const data = await getPaginatedResults(Translation, userId, page, limit);
//     res.json({
//       type: 'translations',
//       ...data
//     });
//   } catch (error) {
//     next(error);
//   }
// });


// router.get('/trainings', authMiddleware, async (req, res, next) => {
//   const userId = req.user.id;
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;

//   try {
//     const data = await getPaginatedResults(TrainingResult, userId, page, limit);
//     res.json({
//       type: 'trainings',
//       ...data
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const mongoose = require('mongoose');


const TestResult = mongoose.model('TestResult');
const TranslationResult = mongoose.model('TranslationResult'); 
const TrainingJob = mongoose.model('TrainingJob'); 


const getPaginatedResults = async (Model, userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const results = await Model.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Model.countDocuments({ userId });
  return {
    results,
    page,
    totalPages: Math.ceil(total / limit),
    hasMore: results.length === limit
  };
};


router.get('/tests', authMiddleware, async (req, res, next) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const data = await getPaginatedResults(TestResult, userId, page, limit);
    res.json({
      type: 'tests',
      ...data
    });
  } catch (error) {
    next(error);
  }
});


router.get('/translations', authMiddleware, async (req, res, next) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const data = await getPaginatedResults(TranslationResult, userId, page, limit);
    res.json({
      type: 'translations',
      ...data
    });
  } catch (error) {
    next(error);
  }
});


router.get('/trainings', authMiddleware, async (req, res, next) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const data = await getPaginatedResults(TrainingJob, userId, page, limit);
    res.json({
      type: 'trainings',
      ...data
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;