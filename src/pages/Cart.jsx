import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import AuthModal from '../components/AuthModal.jsx'
import { getProductById } from '../data/products.js'
import '../assets/Cart.css'

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, quantity: 2, color: 'Đen', size: 'M' },
    { id: 2, quantity: 1, color: 'Trắng', size: 'L' }
  ])
  const [query, setQuery] = useState('')
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId)
      return
    }
    setCartItems(items => 
      items.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (productId) => {
    setCartItems(items => items.filter(item => item.id !== productId))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.id)
      return total + (product?.price || 0) * item.quantity
    }, 0)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Header
          query={query}
          onQueryChange={setQuery}
          onOpenLogin={() => { setAuthMode('login'); setIsAuthOpen(true) }}
          onOpenRegister={() => { setAuthMode('register'); setIsAuthOpen(true) }}
        />
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Giỏ hàng trống</h2>
            <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
            <Link to="/" className="continue-shopping-btn">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
        <AuthModal open={isAuthOpen} initialMode={authMode} onClose={() => setIsAuthOpen(false)} />
      </div>
    )
  }

  return (
    <div className="cart-page">
      <Header
        query={query}
        onQueryChange={setQuery}
        onOpenLogin={() => { setAuthMode('login'); setIsAuthOpen(true) }}
        onOpenRegister={() => { setAuthMode('register'); setIsAuthOpen(true) }}
      />
      
      <div className="cart-container">
        <div className="cart-header">
          <h1>Giỏ hàng của bạn</h1>
          <span className="item-count">{cartItems.length} sản phẩm</span>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => {
              const product = getProductById(item.id)
              if (!product) return null

              return (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  
                  <div className="item-details">
                    <h3 className="item-name">{product.name}</h3>
                    <div className="item-variants">
                      {item.color && <span className="variant">Màu: {item.color}</span>}
                      {item.size && <span className="variant">Size: {item.size}</span>}
                    </div>
                    <div className="item-price">{formatPrice(product.price)}</div>
                  </div>

                  <div className="item-quantity">
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    {formatPrice(product.price * item.quantity)}
                  </div>

                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                    title="Xóa sản phẩm"
                  >
                    ×
                  </button>
                </div>
              )
            })}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Tóm tắt đơn hàng</h3>
              
              <div className="summary-row">
                <span>Tạm tính:</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              
              <div className="summary-row">
                <span>Phí vận chuyển:</span>
                <span className="shipping-fee">Miễn phí</span>
              </div>
              
              <div className="summary-row total">
                <span>Tổng cộng:</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>

              <Link to="/checkout" className="checkout-btn">
                Tiến hành thanh toán
              </Link>
              
              <Link to="/" className="continue-shopping">
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AuthModal open={isAuthOpen} initialMode={authMode} onClose={() => setIsAuthOpen(false)} />
    </div>
  )
}
