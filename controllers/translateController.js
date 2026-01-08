// const fs = require('fs/promises');
// const { translateSignLanguage } = require('../ai-client');
// const { saveTranslation } = require('../services/db-client'); 
// const processTranslation = async (req, res, next) => {
//   const videoPath = req.file ? req.file.path : null;
//   const userId = req.user?.id;
//   const { language } = req.body; 
//   if (!videoPath) {
//     const error = new Error('No video uploaded');
//     error.statusCode = 400;
//     return next(error);
//   }
//   if (!userId) {
//     const error = new Error('User ID not found');
//     error.statusCode = 401;
//     await cleanup(videoPath);
//     return next(error);
//   }
//   try {
//     const translation = await translateSignLanguage(videoPath, userId);
 
//     const savedTranslation = await saveTranslation({ userId, ...translation, language, videoPath });
//     await cleanup(videoPath);
//     res.json({ ...translation, savedId: savedTranslation._id }); 
//   } catch (error) {
//     await cleanup(videoPath);
//     next(error);
//   }
// };
// async function cleanup(filePath) {
//   try {
//     await fs.unlink(filePath);
//   } catch (err) {
//     if (err.code !== 'ENOENT') {
//       console.error('Cleanup failed:', err);
//     }
//   }
// }
// module.exports = { processTranslation };

const fs = require('fs/promises');
const { translateSignLanguage } = require('../ai-client');
const { saveTranslationResult } = require('../services/db-client'); 
const aiClient = require('../ai-client');

const processTranslation = async (req, res, next) => {
  const videoPath = req.file ? req.file.path : null;
  const userId = req.user?.id;
  const { language } = req.body;
  if (!videoPath) {
    const error = new Error('No video uploaded');
    error.statusCode = 400;
    return next(error);
  }
  if (!userId) {
    const error = new Error('User ID not found');
    error.statusCode = 401;
    await cleanup(videoPath);
    return next(error);
  }
  try {
    const translation = await translateSignLanguage(videoPath, userId);

    const savedTranslation = await saveTranslationResult({
      userId,
      videoPath,
      translatedText: translation.translatedText,
      confidence: translation.confidence,
      language,
      processingTime: 0 
    });
    await cleanup(videoPath);
    res.json({ ...translation, savedId: savedTranslation._id });
  } catch (error) {
    await cleanup(videoPath);
    next(error);
  }
};

async function cleanup(filePath) {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error('Cleanup failed:', err);
    }
  }
}


async function translateFrame(req, res, next) {
  // const { frame } = req.body; // base64 string (image/jpeg)
  const { frame } = req.body || {};
  const userId = req.user?.id;

  if (!frame || !userId) {
    return res.status(400).json({ error: 'Frame or user ID required' });
  }

  try {

const result = await aiClient.translateFrame(frame); 
    const saved = await saveTranslationResult({
      userId,
      videoPath: 'frame-base64',
      translatedText: result.translatedText,
      language: 'ar',
      confidence: result.confidence || 0.95,
      processingTime: result.processingTime || 0
    });

    res.json({
      translatedText: result.translatedText,
      confidence: result.confidence || 0.95,
      savedId: saved._id
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { processTranslation, translateFrame };

