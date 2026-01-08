const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
const { mediaStoragePath } = require('../config');


if (!fs.existsSync(mediaStoragePath)) {
  fs.mkdirSync(mediaStoragePath, { recursive: true });
  console.log(`Created uploads directory: ${mediaStoragePath}`);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, mediaStoragePath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /mp4|mov|jpg|png|pdf|csv/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type. Only allowed media and data files.'));
  },
  limits: { fileSize: 100 * 1024 * 1024 }
});

module.exports = { upload };
