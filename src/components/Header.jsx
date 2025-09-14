import { Link } from 'react-router-dom'

export default function Header({ query, onQueryChange, onOpenLogin, onOpenRegister }) {
  return (
    <header className="topbar">
      <Link to="/" className="brand" aria-label="Về trang chủ">
        <span className="brand-badge">PBL</span>
        <span className="brand-name">V-Market</span>
      </Link>
      <div className="search-area">
        <input
          type="text"
          placeholder="Tìm sản phẩm, thương hiệu..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="search-input"
        />
        <Link to={`/search?q=${encodeURIComponent(query)}`} className="search-btn">
          Tìm
        </Link>
      </div>
      <div className="actions">
        <button className="action-btn" onClick={onOpenLogin}>Đăng nhập</button>
        <button className="action-btn" onClick={onOpenRegister}>Đăng ký</button>
        <Link to="/cart" className="cart-btn" aria-label="Giỏ hàng">
          🛒<span className="cart-dot" />
        </Link>
      </div>
    </header>
  );
}

