const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 👉 Corrigido para apontar para a pasta /uploads/fotos
const uploadDir = path.join(__dirname, '..', 'uploads', 'fotos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    cb(null, `${Date.now()}_${name}${ext}`);
  }
});

module.exports = multer({ storage });
