import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((res) => setArticles(res.data));
  }, []);

  const total = articles.length;
  const draft = articles.filter((a) => a.status === "Draft").length;
  const published = total - draft;

  return (
    <div className="admin-page">
      <div className="sidebar">
        <Link to="/admin" className="active">Dashboard</Link>
        <Link to="/admin/manage">Kelola Artikel</Link>
        <Link to="/home">Baca Artikel</Link>
      </div>
      <div className="dashboard">
        <h2>Dashboard Admin</h2>
        <div className="stats">
          <div className="stat-card">
            <h3>{total}</h3>
            <p>Total Artikel</p>
          </div>
          <div className="stat-card">
            <h3>{published}</h3>
            <p>Artikel Publish</p>
          </div>
          <div className="stat-card">
            <h3>{draft}</h3>
            <p>Artikel Draft</p>
          </div>
        </div>
      </div>
    </div>
  );
}
