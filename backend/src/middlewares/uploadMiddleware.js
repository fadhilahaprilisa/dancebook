const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const isValid = file.mimetype.startsWith('image') || file.mimetype.startsWith('video');
    if (!isValid) {
      return cb(new Error('Hanya file foto atau video yang diperbolehkan'));
    }
    cb(null, true);
  },
});

module.exports = upload;
