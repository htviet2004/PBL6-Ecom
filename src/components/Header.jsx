import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header({
  query,
  onQueryChange,
  onOpenLogin,
  onOpenRegister,
  onLogout,
  currentUser
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="topbar">
      <Link to="/" className="brand" aria-label="Về trang chủ">
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
        {currentUser ? (
          <div className="user-avatar">
            <img
              src={currentUser.avatar || "/default-avatar.png"}
              alt={currentUser.name}
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="user-menu show">
                <Link to="/profile">Trang cá nhân</Link>
                <button onClick={onLogout}>Đăng xuất</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button className="action-btn" onClick={onOpenLogin}>Đăng nhập</button>
            <button className="action-btn" onClick={onOpenRegister}>Đăng ký</button>
          </>
        )}

        <Link to="/cart" className="cart-btn" aria-label="Giỏ hàng">
          🛒<span className="cart-dot" />
        </Link>
      </div>
    </header>
  )
}
