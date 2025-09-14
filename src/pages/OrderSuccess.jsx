import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import AuthModal from '../components/AuthModal.jsx'
import { useState } from 'react'
import '../assets/OrderSuccess.css'

export default function OrderSuccess() {
  const [query, setQuery] = useState('')
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  // Mock order data
  const orderData = {
    orderId: 'ORD001234',
    orderDate: new Date().toLocaleDateString('vi-VN'),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN'),
    total: 28990000,
    items: [
      { name: 'iPhone 15 Pro', quantity: 1, price: 28990000 }
    ]
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  return (
    <div className="order-success-page">
      <Header
        query={query}
        onQueryChange={setQuery}
        onOpenLogin={() => { setAuthMode('login'); setIsAuthOpen(true) }}
        onOpenRegister={() => { setAuthMode('register'); setIsAuthOpen(true) }}
      />
      
      <div className="order-success-container">
        <div className="success-content">
          <div className="success-icon">
            <div className="checkmark">✓</div>
          </div>
          
          <h1>Đặt hàng thành công!</h1>
          <p className="success-message">
            Cảm ơn bạn đã đặt hàng. Chúng tôi đã nhận được đơn hàng của bạn và sẽ xử lý trong thời gian sớm nhất.
          </p>

          <div className="order-details">
            <div className="order-info">
              <h2>Thông tin đơn hàng</h2>
              <div className="info-row">
                <span>Mã đơn hàng:</span>
                <strong>{orderData.orderId}</strong>
              </div>
              <div className="info-row">
                <span>Ngày đặt hàng:</span>
                <span>{orderData.orderDate}</span>
              </div>
              <div className="info-row">
                <span>Dự kiến giao hàng:</span>
                <span>{orderData.estimatedDelivery}</span>
              </div>
              <div className="info-row total">
                <span>Tổng tiền:</span>
                <strong>{formatPrice(orderData.total)}</strong>
              </div>
            </div>

            <div className="order-items">
              <h3>Sản phẩm đã đặt</h3>
              {orderData.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                  <span className="item-price">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="next-steps">
            <h3>Bước tiếp theo</h3>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Xác nhận đơn hàng</h4>
                  <p>Chúng tôi sẽ gửi email xác nhận đơn hàng trong vài phút tới</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Chuẩn bị hàng</h4>
                  <p>Đơn hàng sẽ được chuẩn bị và đóng gói cẩn thận</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Giao hàng</h4>
                  <p>Đơn hàng sẽ được giao đến địa chỉ bạn đã cung cấp</p>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <Link to="/profile" className="btn btn-primary">
              Xem đơn hàng của tôi
            </Link>
            <Link to="/" className="btn btn-secondary">
              Tiếp tục mua sắm
            </Link>
          </div>

          <div className="support-info">
            <p>
              <strong>Cần hỗ trợ?</strong> Liên hệ với chúng tôi qua{' '}
              <Link to="/contact">trang liên hệ</Link> hoặc gọi hotline{' '}
              <a href="tel:0123456789">0123 456 789</a>
            </p>
          </div>
        </div>
      </div>

      <AuthModal open={isAuthOpen} initialMode={authMode} onClose={() => setIsAuthOpen(false)} />
    </div>
  )
}
