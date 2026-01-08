require('dotenv').config();

const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000, 
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://localhost:5100',
  jwtSecret: process.env.JWT_SECRET || (() => {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET must be set in production');
    }
    return 'a4b6c8d0e2f4g6h8i0j2k4l6m8n0o2p4q6r8s0t2u4v6w8x0y2z4'; 
  })(),
  dbConfig: {
    uri: process.env.DB_URI || 'mongodb://localhost/wesal_app_db',
    options: {}, 
  },
  mediaStoragePath: process.env.MEDIA_STORAGE_PATH || 'uploads/',
};

// Validation 
if (isNaN(config.port)) {
  throw new Error('PORT must be a valid number');
}

module.exports = config;
