import { useParams, Link } from "react-router-dom";
import { getArticle } from "../api";
import { useEffect, useState } from "react";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getArticle(id).then((res) => setArticle(res.data));
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="detail-page">
      <Link to="/home" className="back-link">← Kembali ke Beranda</Link>
      <h2>{article.title}</h2>
      <img
        className="detail-image"
        src={`http://localhost:5001/uploads/${article.thumbnail}`}
        alt={article.title}
      />
      <p>{article.content}</p>
    </div>
  );
}
