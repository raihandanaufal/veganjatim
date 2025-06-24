import React, { useEffect, useState } from "react";
import { getArticles, deleteArticle } from "../api";
import { Link, useNavigate } from "react-router-dom";

function ManageArticles() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    const res = await getArticles();
    setArticles(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus artikel ini?")) {
      await deleteArticle(id);
      loadArticles();
    }
  };

  return (
    <div className="admin-page">
      <div className="sidebar">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/manage" className="active">Kelola Artikel</Link>
        <Link to="/home">Baca Artikel</Link>
      </div>
      <div className="dashboard">
        <h2>Kelola Artikel</h2>
        <button onClick={() => navigate("/admin/form")}>+ Tambah Artikel</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Judul</th>
              <th>Status</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.title}</td>
                <td>{a.status}</td>
                <td>{new Date(a.createdAt).toLocaleDateString("id-ID")}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/admin/form/${a.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(a.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageArticles;
