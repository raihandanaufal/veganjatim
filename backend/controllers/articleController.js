const { PrismaClient } = require("@prisma/client");
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

// GET /api/articles?category=
exports.getAll = async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category } : {};
    const articles = await prisma.article.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data artikel." });
  }
};

// GET /api/articles/search?q=
exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") {
      return res.status(400).json({ error: "Parameter 'q' tidak boleh kosong." });
    }

    const result = await prisma.article.findMany({
      where: {
        title: {
          contains: q,
          mode: "insensitive",
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Gagal melakukan pencarian artikel." });
  }
};

// GET /api/articles/:id
exports.getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const article = await prisma.article.findUnique({ where: { id } });

    if (!article) {
      return res.status(404).json({ error: "Artikel tidak ditemukan." });
    }

    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil artikel." });
  }
};

// POST /api/articles
exports.create = async (req, res) => {
  try {
    const { title, content, category, status } = req.body;

    // Validasi field wajib
    if (!title || !content || !category || !status) {
      return res.status(400).json({ error: "Semua field harus diisi." });
    }

    // Validasi file wajib
    if (!req.file) {
      return res.status(400).json({ error: "Thumbnail wajib berupa file gambar (.png, .jpg, .jpeg)." });
    }

    // ✅ Validasi ulang MIME type
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Format file tidak valid. Hanya .png, .jpg, dan .jpeg diperbolehkan." });
    }

    const thumbnail = req.file.filename;

    const newArticle = await prisma.article.create({
      data: { title, content, category, status, thumbnail },
    });

    return res.status(201).json({
      success: true,
      message: "Artikel berhasil dibuat.",
      article: newArticle,
    });
  } catch (err) {
    // Cleanup file jika ada error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ error: "Gagal menambahkan artikel." });
  }
};

// PUT /api/articles/:id
exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content, category, status } = req.body;
    const data = { title, content, category, status };

    if (req.file) {
      // Validasi ulang MIME type jika ada file baru
      const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ error: "Format file tidak valid. Hanya .png, .jpg, dan .jpeg diperbolehkan." });
      }

      // Hapus thumbnail lama
      const oldArticle = await prisma.article.findUnique({ where: { id } });
      if (oldArticle && oldArticle.thumbnail) {
        const oldPath = path.join(__dirname, '..', 'uploads', oldArticle.thumbnail);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      data.thumbnail = req.file.filename;
    }

    const updated = await prisma.article.update({
      where: { id },
      data,
    });

    res.status(200).json({
      success: true,
      message: "Artikel berhasil diperbarui.",
      article: updated,
    });
  } catch (err) {
    // Cleanup file jika gagal update
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: "Gagal memperbarui artikel." });
  }
};

// DELETE /api/articles/:id
exports.remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Hapus thumbnail terkait
    const article = await prisma.article.findUnique({ where: { id } });
    if (article && article.thumbnail) {
      const pathToDelete = path.join(__dirname, '..', 'uploads', article.thumbnail);
      if (fs.existsSync(pathToDelete)) {
        fs.unlinkSync(pathToDelete);
      }
    }

    await prisma.article.delete({ where: { id } });

    res.status(200).json({ message: "Artikel berhasil dihapus." });
  } catch (err) {
    res.status(500).json({ error: "Gagal menghapus artikel." });
  }
};
