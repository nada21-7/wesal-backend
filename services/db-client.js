// const mongoose = require('mongoose');
// const { dbConfig } = require('../config');
// // Schemas
// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true, trim: true, minlength: 2, maxlength: 30 },
//   lastName: { type: String, required: true, trim: true, minlength: 2, maxlength: 30 },
//   age: { type: Number, required: true, min: 13, max: 120 },
//   gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
//   email: { type: String, required: true, unique: true, lowercase: true, match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i },
//   password: { type: String, required: true, select: false }
// }, { timestamps: true });
// userSchema.index({ email: 1 });
// const contactSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
//   email: { type: String, required: true, match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i },
//   message: { type: String, required: true, minlength: 10, maxlength: 2000 }
// }, { timestamps: true });
// const testSchema = new mongoose.Schema({
//   question: { type: String, required: true },
//   options: { type: [String], required: true }
// });
// const translationSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   videoPath: { type: String }, 
//   translatedText: { type: String, required: true },
//   confidence: { type: Number, min: 0, max: 1 },
//   language: { type: String, enum: ['ar', 'en'] } 
// }, { timestamps: true });
// const trainingResultSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   dataPath: { type: String },
//   message: { type: String, required: true },
//   modelType: { type: String, enum: ['sign_language', 'other'] }
// }, { timestamps: true });
// const Test = mongoose.model('Test', testSchema);
// const User = mongoose.model('User', userSchema);
// const Contact = mongoose.model('Contact', contactSchema);
// const Translation = mongoose.model('Translation', translationSchema);
// const TrainingResult = mongoose.model('TrainingResult', trainingResultSchema);
// async function connectDB() {
//   if (mongoose.connection.readyState === 0) {
//     try {
//       await mongoose.connect(dbConfig.uri);
//       console.log('MongoDB connected successfully');
//     } catch (err) {
//       console.error('MongoDB connection failed:', err);
//       throw err;
//     }
//   }
// }
// async function registerUser({ firstName, lastName, age, gender, email, hashedPassword }) {
//   await connectDB();
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     const error = new Error('Email already exists');
//     error.statusCode = 400;
//     throw error;
//   }
//   const newUser = new User({ firstName, lastName, age, gender, email, password: hashedPassword });
//   await newUser.save();
//   return { id: newUser._id, firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email };
// }
// async function loginUser({ email }) {
//   await connectDB();
//   const user = await User.findOne({ email }).select('+password');
//   return user;
// }
// async function getTests() {
//   await connectDB();
//   return await Test.find();
// }
// async function submitTest(answers, userId) {
//   await connectDB();
//   const score = 80;
//   console.log(`Saving test results for user ${userId}`);
//   return score;
// }
// async function saveContact({ name, email, message }) {
//   await connectDB();
//   const newContact = new Contact({ name, email, message });
//   await newContact.save();
// }
// async function saveTranslation({ userId, translatedText, confidence, language, videoPath }) {
//   await connectDB();
//   const newTranslation = new Translation({ userId, translatedText, confidence, language, videoPath });
//   await newTranslation.save();
//   return newTranslation;
// }
// async function saveTrainingResult({ userId, message, modelType, dataPath }) {
//   await connectDB();
//   const newResult = new TrainingResult({ userId, message, modelType, dataPath });
//   await newResult.save();
//   return newResult;
// }


// const testResultSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' }, 
//   answers: [{
//     questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
//     selectedOption: { type: String, required: true },
//     isCorrect: { type: Boolean } 
//   }],
//   score: { type: Number, required: true },
// }, { timestamps: true });

// const TestResult = mongoose.model('TestResult', testResultSchema);


// async function saveTestResult({ userId, testId, answers, score }) {
//   await connectDB();
//   const newResult = new TestResult({ userId, testId, answers, score });
//   await newResult.save();
//   return newResult;
// }


// async function submitTest(answers, userId, testId) {
//   await connectDB();
  
  
//   const score = Math.round((answers.length / answers.length) * 100); 
  
  
//   const savedResult = await saveTestResult({ userId, testId, answers, score });
  
//   console.log(`Test results saved for user ${userId}, score: ${score}`);
//   return { score, resultId: savedResult._id };
// }
// module.exports = { connectDB, registerUser, loginUser, getTests, submitTest, saveContact, saveTranslation, saveTrainingResult, saveTestResult };






const mongoose = require('mongoose');
const { dbConfig } = require('../config');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true, minlength: 2, maxlength: 30 },
  lastName: { type: String, required: true, trim: true, minlength: 2, maxlength: 30 },
  age: { type: Number, required: true, min: 13, max: 120 },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  email: { type: String, required: true, unique: true, lowercase: true, match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i },
  password: { type: String, required: true, select: false }
}, { timestamps: true });

userSchema.index({ email: 1 });

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
  email: { type: String, required: true, match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i },
  message: { type: String, required: true, minlength: 10, maxlength: 2000 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

const testSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  category: { type: String, default: 'general' },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  tags: { type: [String], default: [] }
}, { timestamps: true });

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const testResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, required: false },
    selectedOption: { type: String, required: false },
    expected: { type: String },
    received: { type: String },
    isCorrect: { type: Boolean, required: true }
  }],
  score: { type: Number, required: true, min: 0, max: 100 },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const trainingJobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filePath: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  modelType: { type: String, default: 'sign_language' },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
  errorMessage: { type: String, default: null },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null }
}, { timestamps: true });

const translationResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoPath: { type: String, required: true },
  translatedText: { type: String, required: true },
  language: { type: String, enum: ['ar', 'en'], default: 'ar' },
  confidence: { type: Number, min: 0, max: 1, default: 0 },
  processingTime: { type: Number, default: 0 }
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Test = mongoose.model('Test', testSchema);
const Content = mongoose.model('Content', contentSchema);
const TestResult = mongoose.model('TestResult', testResultSchema);
const TrainingJob = mongoose.model('TrainingJob', trainingJobSchema);
const TranslationResult = mongoose.model('TranslationResult', translationResultSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(dbConfig.uri); 
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error('MongoDB connection failed:', err);
      throw err;
    }
  }
}

async function registerUser({ firstName, lastName, age, gender, email, hashedPassword }) {
  await connectDB();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email already exists');
    error.statusCode = 400;
    throw error;
  }
  const newUser = new User({ firstName, lastName, age, gender, email, password: hashedPassword });
  await newUser.save();
  return { id: newUser._id, firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email };
}

async function loginUser({ email }) {
  await connectDB();
  return await User.findOne({ email }).select('+password');
}

async function getTests() {
  await connectDB();
  return await Test.find();
}

async function submitTest(answers, userId, testId) {
  await connectDB();

  const test = await Test.findById(testId);
  if (!test) {
    const error = new Error('Test not found');
    error.statusCode = 404;
    throw error;
  }

  let correctCount = 0;

  const processedAnswers = answers.map(answer => {
    if (answer.hasOwnProperty('isCorrect')) {
      if (answer.isCorrect) correctCount++;
      return {
        expected: answer.expected,
        received: answer.received,
        isCorrect: answer.isCorrect
      };
    } 
    
    const isCorrect = answer.selectedOption === test.correctAnswer;
    if (isCorrect) correctCount++;
    return {
      questionId: answer.questionId,
      selectedOption: answer.selectedOption,
      isCorrect: isCorrect
    };
  });

  const score = Math.round((correctCount / answers.length) * 100);

  const testResult = new TestResult({
    userId,
    testId,
    answers: processedAnswers,
    score,
    submittedAt: new Date()
  });

  await testResult.save();
  return score;
}

async function saveContact({ name, email, message, userId = null }) {
  await connectDB();
  const newContact = new Contact({ name, email, message, userId });
  await newContact.save();
  return newContact;
}

async function getAllContent(page = 1, limit = 10, filter = {}) {
  await connectDB();
  const skip = (page - 1) * limit;
  const query = {};
  if (filter && filter.search) {
    query.$text = { $search: filter.search };
  }
  const content = await Content.find(query)
    .populate('userId', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  const total = await Content.countDocuments(query);
  return { content, total };
}

async function createContent({ title, description, userId }) {
  await connectDB();
  const newContent = new Content({ title, description: description || '', userId });
  await newContent.save();
  return newContent;
}

async function getContentById(id) {
  await connectDB();
  const content = await Content.findById(id).populate('userId', 'firstName lastName email');
  if (!content) {
    const error = new Error('Content not found');
    error.statusCode = 404;
    throw error;
  }
  return content;
}

async function updateContentById(id, updates) {
  await connectDB();
  const content = await Content.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true, runValidators: true }
  ).populate('userId', 'firstName lastName email');
  if (!content) {
    const error = new Error('Content not found');
    error.statusCode = 404;
    throw error;
  }
  return content;
}

async function deleteContentById(id) {
  await connectDB();
  const content = await Content.findByIdAndDelete(id);
  if (!content) {
    const error = new Error('Content not found');
    error.statusCode = 404;
    throw error;
  }
  return content;
}

async function createTrainingJob({ userId, filePath, fileName, fileType, modelType = 'sign_language' }) {
  await connectDB();
  const trainingJob = new TrainingJob({
    userId,
    filePath,
    fileName,
    fileType,
    modelType,
    status: 'pending',
    startedAt: new Date()
  });
  await trainingJob.save();
  return trainingJob;
}

async function updateTrainingJobStatus(jobId, status, errorMessage = null) {
  await connectDB();
  const updates = { status };
  if (status === 'completed' || status === 'failed') {
    updates.completedAt = new Date();
  }
  if (errorMessage) {
    updates.errorMessage = errorMessage;
  }
  return await TrainingJob.findByIdAndUpdate(jobId, { $set: updates }, { new: true });
}

async function getTrainingJobsByUser(userId) {
  await connectDB();
  return await TrainingJob.find({ userId }).sort({ createdAt: -1 }).limit(50);
}

async function saveTranslationResult({ userId, videoPath, translatedText, language = 'ar', confidence = 0, processingTime = 0 }) {
  await connectDB();
  const translation = new TranslationResult({ userId, videoPath, translatedText, language, confidence, processingTime });
  await translation.save();
  return translation;
}

async function getTranslationHistory(userId, limit = 20) {
  await connectDB();
  return await TranslationResult.find({ userId }).sort({ createdAt: -1 }).limit(limit);
}

async function getTestResultsByUser(userId) {
  await connectDB();
  return await TestResult.find({ userId })
    .populate('testId', 'question category difficulty')
    .sort({ submittedAt: -1 });
}

module.exports = {
  connectDB,registerUser,loginUser,getTests,submitTest,getTestResultsByUser,
  saveContact,getAllContent,createContent,getContentById,updateContentById,
  deleteContentById,createTrainingJob,updateTrainingJobStatus,getTrainingJobsByUser,
  saveTranslationResult,getTranslationHistory
};