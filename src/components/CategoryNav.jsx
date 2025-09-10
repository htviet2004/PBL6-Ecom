export default function CategoryNav({ categories, active, onChange }) {
  return (
    <nav className="category-nav">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`category-chip ${active === cat ? "active" : ""}`}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}

