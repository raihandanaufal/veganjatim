import React from "react";
import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <Link to={`/artikel/${article.id}`} className="article-card">
      <img src={`http://localhost:5000/uploads/${article.thumbnail}`} alt="thumbnail" />
      <h4>{article.title}</h4>
      <p>{article.category}</p>
      <p>{Math.ceil(article.content.length / 500)} menit membaca</p>
    </Link>
  );
}

export default ArticleCard;
