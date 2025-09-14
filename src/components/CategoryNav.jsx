import { Link } from 'react-router-dom'

export default function CategoryNav({ categories, active, onChange }) {
  return (
    <nav className="category-nav">
      {categories.map((cat) => (
        <Link
          key={cat}
          to={cat === 'Tất cả' ? '/' : `/category/${encodeURIComponent(cat)}`}
          onClick={() => onChange(cat)}
          className={`category-chip ${active === cat ? "active" : ""}`}
        >
          {cat}
        </Link>
      ))}
    </nav>
  );
}

