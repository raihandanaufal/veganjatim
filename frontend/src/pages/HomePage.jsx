import React, { useState, useEffect } from "react";
import { getArticles } from "../api";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import SearchBar from "../components/SearchBar";


function HomePage() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadArticles();
  }, [category]);

  const loadArticles = async () => {
    const res = await getArticles(category ? { params: { category } } : {});
    setArticles(res.data);
  };

  const filtered = articles.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="home-container">
      <div className="navbar">
        <input
          type="text"
          placeholder="Cari artikel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="category">
          {["Semua", "Tips", "Resep", "Nutrisi"].map((cat) => (
            <button key={cat} onClick={() => setCategory(cat === "Semua" ? "" : cat)}>
              {cat}
            </button>
          ))}
        </div>
        <Link to="/admin" className="admin-link">Panel Admin</Link>
      </div>
      <div className="article-list">
  {filtered.length === 0 ? (
    <p style={{ marginTop: "2rem", color: "gray", textAlign: "center" }}>
      Tidak ada hasil yang ditemukan.
    </p>
  ) : (
    filtered.map((article) => (
      <Link to={`/artikel/${article.id}`} key={article.id}>
        <div className="article-card">
          <img src={`http://localhost:5001/uploads/${article.thumbnail}`} alt="" />
          <h4>{article.title}</h4>
          <p>{Math.ceil(article.content.length / 500)} menit membaca</p>
        </div>
      </Link>
    ))
  )}
</div>

    </div>
  );
}

export default HomePage;
