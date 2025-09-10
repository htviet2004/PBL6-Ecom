import { Link } from 'react-router-dom'

export default function Header({ query, onQueryChange, onOpenLogin, onOpenRegister }) {
  return (
    <header className="topbar">
      <a href="#" className="brand" aria-label="Về trang chủ">
        <span className="brand-badge">PBL</span>
        <span className="brand-name">V-Market</span>
      </a>
      <div className="search-area">
        <input
          type="text"
          placeholder="Tìm sản phẩm, thương hiệu..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="search-input"
        />
        <button className="search-btn">Tìm</button>
      </div>
      <div className="actions">
        <button className="action-btn" onClick={onOpenLogin}>Đăng nhập</button>
        <button className="action-btn" onClick={onOpenRegister}>Đăng ký</button>
        <button className="cart-btn" aria-label="Giỏ hàng">
          🛒<span className="cart-dot" />
        </button>
      </div>
    </header>
  );
}

