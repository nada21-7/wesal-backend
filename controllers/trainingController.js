// const fs = require('fs/promises');
// const { trainModel } = require('../ai-client');
// const { saveTrainingResult } = require('../services/db-client'); 
// const startTrainingJob = async (req, res, next) => {
//   const filePath = req.file ? req.file.path : null;
//   const userId = req.user?.id;
//   const { modelType } = req.body;
//   if (!filePath) {
//     const error = new Error('No file uploaded');
//     error.statusCode = 400;
//     return next(error);
//   }
//   if (!userId) {
//     const error = new Error('User ID not found');
//     error.statusCode = 401;
//     await cleanup(filePath);
//     return next(error);
//   }
//   try {
//     const message = await trainModel(filePath, userId);
//     const savedResult = await saveTrainingResult({ userId, message, modelType, dataPath: filePath });
//     await cleanup(filePath);
//     res.json({ message, savedId: savedResult._id });
//   } catch (error) {
//     await cleanup(filePath);
//     next(error);
//   }
// };
// async function cleanup(filePath) {
//   try {
//     await fs.unlink(filePath);
//   } catch (err) {
//     if (err.code !== 'ENOENT') {
//       console.error('Cleanup failed after training error:', err);
//     }
//   }
// }
// module.exports = { startTrainingJob };

// const fs = require('fs/promises');
// const { trainModel } = require('../ai-client');
// const { createTrainingJob } = require('../services/db-client'); 

// const startTrainingJob = async (req, res, next) => {
//   const filePath = req.file ? req.file.path : null;
//   const userId = req.user?.id;
//   const { modelType } = req.body;
//   if (!filePath) {
//     const error = new Error('No file uploaded');
//     error.statusCode = 400;
//     return next(error);
//   }
//   if (!userId) {
//     const error = new Error('User ID not found');
//     error.statusCode = 401;
//     await cleanup(filePath);
//     return next(error);
//   }
//   try {
//     const message = await trainModel(filePath, userId);
//     const savedJob = await createTrainingJob({
//       userId,
//       filePath,
//       fileName: req.file.originalname,
//       fileType: req.file.mimetype,
//       modelType: modelType || 'sign_language'
//     });
//     await cleanup(filePath);
//     res.json({ message, jobId: savedJob._id }); 
//   } catch (error) {
//     await cleanup(filePath);
//     next(error);
//   }
// };

// async function cleanup(filePath) {
//   try {
//     await fs.unlink(filePath);
//   } catch (err) {
//     if (err.code !== 'ENOENT') {
//       console.error('Cleanup failed after training error:', err);
//     }
//   }
// }

// module.exports = { startTrainingJob };

const fs = require('fs/promises');
const { trainModel } = require('../ai-client');
const { createTrainingJob } = require('../services/db-client'); 

const startTrainingJob = async (req, res, next) => {
  const filePath = req.file ? req.file.path : null;
  const userId = req.user?.id;
  const { modelType } = req.body;

  if (!filePath) {
    const error = new Error('No file uploaded');
    error.statusCode = 400;
    return next(error);
  }

  if (!userId) {
    const error = new Error('User ID not found');
    error.statusCode = 401;
    await cleanup(filePath);
    return next(error);
  }

  try {
    const aiResponse = await trainModel(filePath, userId);

    const successMessage = typeof aiResponse === 'object' ? aiResponse.message : aiResponse;

    const savedJob = await createTrainingJob({
      userId,
      filePath, 
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      modelType: modelType || 'sign_language',
      status: 'completed' 
    });

    await cleanup(filePath);

    res.json({ 
      success: true,
      message: successMessage, 
      jobId: savedJob._id 
    }); 

  } catch (error) {
    await cleanup(filePath);
    next(error);
  }
};

async function cleanup(filePath) {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error('Cleanup failed after training error:', err);
    }
  }
}

module.exports = { startTrainingJob };
