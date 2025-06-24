import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticleDetail from "./pages/ArticleDetail";
import AdminDashboard from "./pages/AdminDashboard";
import ManageArticles from "./pages/ManageArticles";
import ArticleForm from "./pages/ArticleForm";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect landing page "/" ke /admin */}
        <Route path="/" element={<Navigate to="/admin" />} />

        {/* Halaman User */}
        <Route path="/artikel/:id" element={<ArticleDetail />} />

        {/* Halaman Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manage" element={<ManageArticles />} />
        <Route path="/admin/form" element={<ArticleForm />} />
        <Route path="/admin/form/:id" element={<ArticleForm />} />

        
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
