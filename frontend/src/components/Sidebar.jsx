import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <Link to="/admin" className={location.pathname === "/admin" ? "active" : ""}>
        Dashboard
      </Link>
      <Link to="/admin/manage" className={location.pathname.includes("/admin/manage") ? "active" : ""}>
        Kelola Artikel
      </Link>
      <Link to="/home" className={location.pathname === "/" ? "active" : ""}>
        Baca Artikel
      </Link>
    </div>
  );
}

export default Sidebar;
