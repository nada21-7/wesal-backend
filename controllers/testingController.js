
// const { getTests, submitTest } = require('../services/db-client');

// const getAvailableTests = async (req, res, next) => {
//   const userId = req.user?.id;
//   if (!userId) {
//     const error = new Error('User ID not found');
//     error.statusCode = 401;
//     return next(error);
//   }
//   try {
//     const tests = await getTests();
//     res.json({ tests });
//   } catch (error) {
//     next(error);
//   }
// };

// const submitUserTest = async (req, res, next) => {
//   const { answers, testId } = req.body;
//   const userId = req.user?.id;
//   if (!userId) {
//     const error = new Error('User ID not found');
//     error.statusCode = 401;
//     return next(error);
//   }
//   if (!answers || !Array.isArray(answers) || answers.length === 0) {
//     const error = new Error('Answers must be a non-empty array');
//     error.statusCode = 400;
//     return next(error);
//   }
//   try {
//     const score = await submitTest(answers, userId, testId); 
//     res.json({ 
//       message: 'Test submitted successfully',
//       score 
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { getAvailableTests, submitUserTest };

const { getTests, submitTest } = require('../services/db-client');
const aiClient = require('../ai-client'); 

const getAvailableTests = async (req, res, next) => {
  const userId = req.user?.id;
  if (!userId) {
    const error = new Error('User ID not found');
    error.statusCode = 401;
    return next(error);
  }
  try {
    const tests = await getTests();
    res.json({ tests });
  } catch (error) {
    next(error);
  }
};


const submitUserTest = async (req, res, next) => {
  const { frame, expectedChar, testId } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    const error = new Error('User ID not found');
    error.statusCode = 401;
    return next(error);
  }

  if (!frame || !expectedChar) {
    const error = new Error('Frame and expected character are required for interactive testing');
    error.statusCode = 400;
    return next(error);
  }

  try {
    const aiResult = await aiClient.translateFrame(frame);
    
    const detectedChar = aiResult.translatedText || "";
    const isCorrect = detectedChar.trim().toLowerCase() === expectedChar.trim().toLowerCase();

    const answers = [{
      expected: expectedChar,
      received: detectedChar,
      isCorrect: isCorrect
    }];

    const score = await submitTest(answers, userId, testId); 

    res.json({ 
      success: true,
      message: isCorrect ? 'إجابة صحيحة! أحسنت' : `إجابة خاطئة، لقد قرأ النظام: ${detectedChar}`,
      isCorrect: isCorrect,
      score: score 
    });

  } catch (error) {
    console.error("Error in AI Test Submission:", error.message);
    next(error);
  }
};

module.exports = { 
  getAvailableTests, 
  submitUserTest 
};

