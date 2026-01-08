// const axios = require('axios');
// const fs = require('fs');
// const fsPromises = require('fs/promises');
// const FormData = require('form-data');
// const { aiServiceUrl } = require('./config');

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// async function cleanupFile(filePath) {
//   try {
//     await fsPromises.unlink(filePath);
//   } catch (unlinkError) {
//     if (unlinkError.code !== 'ENOENT') {
//       console.error(`Error deleting file ${filePath}:`, unlinkError);
//     }
//   }
// }


// const checkIsMock = () => {
//   if (!aiServiceUrl) return true;
//   return false; 
// };

// async function translateSignLanguage(videoPath, userId) {
//   if (!fs.existsSync(videoPath)) {
//     throw new Error(`Video file not found: ${videoPath}`);
//   }

//   if (checkIsMock()) {
//     await delay(1500);
//     await cleanupFile(videoPath);
//     return { translatedText: "Mock: Hello (Video)", confidence: 0.95 };
//   }

//   const formData = new FormData();
//   formData.append('videoFile', fs.createReadStream(videoPath));
//   formData.append('userId', userId);

//   try {
//     const response = await axios.post(`${aiServiceUrl}/translate`, formData, {
//       headers: formData.getHeaders(),
//       timeout: 30000
//     });
//     await cleanupFile(videoPath);
//     return response.data; 
//   } catch (error) {
//     await cleanupFile(videoPath);
//     throw new Error('AI translation failed: ' + (error.response?.data?.error || error.message));
//   }
// }

// async function trainModel(dataPath, userId) {
//   if (!fs.existsSync(dataPath)) {
//     throw new Error(`Training data file not found: ${dataPath}`);
//   }

//   if (checkIsMock()) {
//     await delay(2000);
//     await cleanupFile(dataPath);
//     return { message: "Mock: Training started successfully" };
//   }

//   const formData = new FormData();
//   formData.append('trainingData', fs.createReadStream(dataPath));
//   formData.append('userId', userId);

//   try {
//     const response = await axios.post(`${aiServiceUrl}/train`, formData, {
//       headers: formData.getHeaders(),
//       timeout: 60000 
//     });
//     await cleanupFile(dataPath);
//     return response.data; 
//   } catch (error) {
//     await cleanupFile(dataPath);
//     throw new Error('AI training failed: ' + (error.response?.data?.error || error.message));
//   }
// }

// async function translateFrame(frameBase64) {
//   if (checkIsMock()) {
//     await delay(500);
//     return { translatedText: 'Mock: مرحبا', confidence: 0.92 };
//   }

//   try {
//     const response = await axios.post(`${aiServiceUrl}/frame`, { frame: frameBase64 }, {
//       headers: { 'Content-Type': 'application/json' },
//       timeout: 10000
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error('Frame translation failed: ' + error.message);
//   }
// }


// module.exports = { translateSignLanguage, trainModel, translateFrame };

const axios = require('axios');
const fs = require('fs');
const fsPromises = require('fs/promises');
const FormData = require('form-data');
const { aiServiceUrl } = require('./config');

async function cleanupFile(filePath) {
  try {
    await fsPromises.unlink(filePath);
  } catch (unlinkError) {
    if (unlinkError.code !== 'ENOENT') {
      console.error(`Error deleting file ${filePath}:`, unlinkError);
    }
  }
}

async function translateSignLanguage(videoPath, userId) {
  if (!fs.existsSync(videoPath)) {
    throw new Error(`Video file not found: ${videoPath}`);
  }

  const formData = new FormData();
  formData.append('videoFile', fs.createReadStream(videoPath));
  formData.append('userId', userId);

  try {
    const response = await axios.post(`${aiServiceUrl}/translate`, formData, {
      headers: formData.getHeaders(),
      timeout: 60000 
    });
    await cleanupFile(videoPath);
    return response.data; 
  } catch (error) {
    await cleanupFile(videoPath);
    const errorMsg = error.response?.data?.error || error.message;
    throw new Error('AI Server Connection Error: ' + errorMsg);
  }
}

async function trainModel(dataPath, userId) {
  if (!fs.existsSync(dataPath)) {
    throw new Error(`Training data file not found: ${dataPath}`);
  }

  const formData = new FormData();
  formData.append('trainingData', fs.createReadStream(dataPath));
  formData.append('userId', userId);

  try {
    const response = await axios.post(`${aiServiceUrl}/train`, formData, {
      headers: formData.getHeaders(),
      timeout: 120000 
    });
    await cleanupFile(dataPath);
    return response.data;
  } catch (error) {
    await cleanupFile(dataPath);
    throw new Error('Training Failed on AI Server: ' + (error.response?.data?.error || error.message));
  }
}

async function translateFrame(frameBase64) {
  try {
    const response = await axios.post(`${aiServiceUrl}/frame`, { frame: frameBase64 }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 15000 
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Real-time AI Translation Failed: ' + error.message);
  }
}

module.exports = { translateSignLanguage, trainModel, translateFrame };
