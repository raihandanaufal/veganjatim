const multer = require("multer");

// Konfigurasi sama seperti sebelumnya
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file .png, .jpg, dan .jpeg yang diperbolehkan."));
  }
};

const upload = multer({ storage, fileFilter });

// ✅ Middleware Express-style
const handleUpload = (req, res, next) => {
  const uploader = upload.single("thumbnail");
  uploader(req, res, function (err) {
    if (err instanceof multer.MulterError || err?.message?.includes("Hanya file")) {
      return res.status(400).json({ error: err.message });
    }
    next(); // lanjut ke controller
  });
};

module.exports = handleUpload;
