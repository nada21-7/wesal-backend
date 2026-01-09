const multer = require('multer');
const path = require('path');

// 1. شلنا الـ fs والـ mkdirSync تماماً لأن فيرسل بيرفضهم
// 2. استخدمنا memoryStorage بدلاً من diskStorage
const storage = multer.memoryStorage(); 

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
  limits: { fileSize: 10 * 1024 * 1024 } // ملحوظة: فيرسل ليميت الملفات فيه 4.5MB للنسخة المجانية
});

module.exports = { upload };;
