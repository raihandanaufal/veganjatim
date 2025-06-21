const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer"); // ✅ WAJIB untuk cek instanceof

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// === Middleware umum ===
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// === Routes ===
const articleRoutes = require("./routes/articleRoutes");
app.use("/api/articles", articleRoutes);

// === Test endpoint ===
app.get("/", (req, res) => {
  res.send("🟢 Vegan Jatim API is running...");
});

// === Global Error Handler (upload & lainnya) ===
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.code === "INVALID_FILE_TYPE") {
    return res.status(400).json({ error: err.message });
  }

  console.error("❌ Server Error:", err.message);
  return res.status(500).json({ error: "Terjadi kesalahan pada server." });
});

// === Jalankan server ===
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
