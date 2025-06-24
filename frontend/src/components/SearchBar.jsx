import React from "react";

function SearchBar({ search, setSearch, category, setCategory }) {
  const categories = ["Semua", "Tips", "Resep", "Nutrisi"];

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Cari artikel..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat === "Semua" ? "" : cat)}
            className={category === cat || (cat === "Semua" && category === "") ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
