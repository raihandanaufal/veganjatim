import React, { useState, useEffect } from "react";
import { createArticle, getArticle, updateArticle } from "../api";
import { useNavigate, useParams, Link } from "react-router-dom";

function ArticleForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    status: "Draft",
  });

  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (id) {
      getArticle(id).then((res) => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setThumbnail(file); // simpan semua jenis file, validasi saat submit
  };

  const handleSubmit = async (status) => {
    try {
      // ✅ Validasi thumbnail harus gambar (jika diunggah)
      if (thumbnail) {
        const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
        if (!allowedTypes.includes(thumbnail.type)) {
          alert("Hanya file .png, .jpg, dan .jpeg yang diperbolehkan.");
          return;
        }
      }

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("content", form.content);
      formData.append("status", status);
      if (thumbnail) formData.append("thumbnail", thumbnail);

      if (id) {
        await updateArticle(id, formData);
      } else {
        await createArticle(formData);
      }

      navigate("/admin/manage");
    } catch (err) {
      alert(err.response?.data?.error || "Terjadi kesalahan saat menyimpan artikel.");
    }
  };

  return (
    <div className="admin-page">
      <div className="sidebar">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/manage">Kelola Artikel</Link>
        <Link to="/home">Baca Artikel</Link>
      </div>

      <div className="dashboard">
        <h2>{id ? "Edit Artikel" : "Tambah Artikel"}</h2>

        <div className="form-group">
          <label>Judul Artikel</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Masukkan judul artikel"
          />
        </div>

        <div className="form-group">
          <label>Kategori</label>
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="">Pilih Kategori</option>
            <option value="Tips">Tips</option>
            <option value="Resep">Resep</option>
            <option value="Nutrisi">Nutrisi</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Thumbnail</label>
          <input
            type="file"
            onChange={handleFile}
          />
        </div>

        <div className="form-group">
          <label>Isi Artikel</label>
          <textarea
            name="content"
            rows="10"
            value={form.content}
            onChange={handleChange}
            placeholder="Tulis isi artikel di sini..."
          />
        </div>

        <div className="buttons">
          <button onClick={() => navigate("/admin/manage")} className="cancel">
            Batal
          </button>
          <button onClick={() => handleSubmit("Draft")} className="draft">
            Simpan sebagai Draft
          </button>
          <button onClick={() => handleSubmit("Published")} className="publish">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticleForm;
