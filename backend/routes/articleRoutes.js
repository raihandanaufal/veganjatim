const express = require("express");
const router = express.Router();
const multer = require("multer");

// ======== Multer Setup ========
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error("Hanya file .png, .jpg, dan .jpeg yang diperbolehkan.");
    error.code = "INVALID_FILE_TYPE"; // Penting untuk dikenali di app.js
    cb(error, false); // Tolak file
  }
};

const upload = multer({ storage, fileFilter });

// === Middleware upload yang benar-benar lempar error ===
const uploadSingle = (req, res, next) => {
  upload.single("thumbnail")(req, res, function (err) {
    if (err) {
      console.error("❌ Upload error:", err.message); // opsional log
      return next(err); // Pastikan error dilempar ke global handler
    }
    next();
  });
};

// === Controller Import ===
const {
  getAll,
  getById,
  search,
  create,
  update,
  remove,
} = require("../controllers/articleController");

// === Routes ===
router.get("/search", search);
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", uploadSingle, create);
router.put("/:id", uploadSingle, update);
router.delete("/:id", remove);

module.exports = router;
