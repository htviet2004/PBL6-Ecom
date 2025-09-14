import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import AuthModal from '../components/AuthModal.jsx'
import { getProductById } from '../data/products.js'
import '../assets/Checkout.css'

export default function Checkout() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  
  // Mock cart items - trong thực tế sẽ lấy từ context/state management
  const [cartItems] = useState([
    { id: 1, quantity: 2, color: 'Đen', size: 'M' },
    { id: 2, quantity: 1, color: 'Trắng', size: 'L' }
  ])

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    paymentMethod: 'cod',
    notes: ''
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên'
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại'
    if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email'
    if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ'
    if (!formData.city) newErrors.city = 'Vui lòng chọn tỉnh/thành phố'
    if (!formData.district) newErrors.district = 'Vui lòng chọn quận/huyện'
    if (!formData.ward) newErrors.ward = 'Vui lòng chọn phường/xã'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Simulate order processing
      alert('Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.')
      navigate('/order-success')
    }
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

  return (
    <div className="checkout-page">
      <Header
        query={query}
        onQueryChange={setQuery}
        onOpenLogin={() => { setAuthMode('login'); setIsAuthOpen(true) }}
        onOpenRegister={() => { setAuthMode('register'); setIsAuthOpen(true) }}
      />
      
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Thanh toán</h1>
          <div className="checkout-steps">
            <div className="step active">1. Thông tin giao hàng</div>
            <div className="step">2. Xác nhận đơn hàng</div>
            <div className="step">3. Hoàn tất</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-content">
            <div className="shipping-info">
              <h2>Thông tin giao hàng</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Họ và tên *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={errors.fullName ? 'error' : ''}
                    placeholder="Nhập họ và tên"
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="Nhập số điện thoại"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Nhập email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">Tỉnh/Thành phố *</label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'error' : ''}
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="danang">Đà Nẵng</option>
                    <option value="cantho">Cần Thơ</option>
                  </select>
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="district">Quận/Huyện *</label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className={errors.district ? 'error' : ''}
                  >
                    <option value="">Chọn quận/huyện</option>
                    <option value="q1">Quận 1</option>
                    <option value="q2">Quận 2</option>
                    <option value="q3">Quận 3</option>
                    <option value="q7">Quận 7</option>
                  </select>
                  {errors.district && <span className="error-message">{errors.district}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="ward">Phường/Xã *</label>
                <select
                  id="ward"
                  name="ward"
                  value={formData.ward}
                  onChange={handleInputChange}
                  className={errors.ward ? 'error' : ''}
                >
                  <option value="">Chọn phường/xã</option>
                  <option value="p1">Phường 1</option>
                  <option value="p2">Phường 2</option>
                  <option value="p3">Phường 3</option>
                </select>
                {errors.ward && <span className="error-message">{errors.ward}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="address">Địa chỉ chi tiết *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? 'error' : ''}
                  placeholder="Số nhà, tên đường..."
                  rows="3"
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="notes">Ghi chú</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Ghi chú thêm cho đơn hàng..."
                  rows="3"
                />
              </div>
            </div>

            <div className="order-summary">
              <h2>Đơn hàng của bạn</h2>
              
              <div className="order-items">
                {cartItems.map(item => {
                  const product = getProductById(item.id)
                  if (!product) return null

                  return (
                    <div key={item.id} className="order-item">
                      <img src={product.image} alt={product.name} />
                      <div className="item-info">
                        <h4>{product.name}</h4>
                        <div className="item-variants">
                          {item.color && <span>Màu: {item.color}</span>}
                          {item.size && <span>Size: {item.size}</span>}
                        </div>
                        <div className="item-quantity">Số lượng: {item.quantity}</div>
                      </div>
                      <div className="item-price">
                        {formatPrice(product.price * item.quantity)}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="payment-method">
                <h3>Phương thức thanh toán</h3>
                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                    />
                    <span>Thanh toán khi nhận hàng (COD)</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={handleInputChange}
                    />
                    <span>Chuyển khoản ngân hàng</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="momo"
                      checked={formData.paymentMethod === 'momo'}
                      onChange={handleInputChange}
                    />
                    <span>Ví MoMo</span>
                  </label>
                </div>
              </div>

              <div className="order-total">
                <div className="total-row">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="total-row">
                  <span>Phí vận chuyển:</span>
                  <span className="free-shipping">Miễn phí</span>
                </div>
                <div className="total-row final">
                  <span>Tổng cộng:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              <button type="submit" className="place-order-btn">
                Đặt hàng
              </button>
            </div>
          </div>
        </form>
      </div>

      <AuthModal open={isAuthOpen} initialMode={authMode} onClose={() => setIsAuthOpen(false)} />
    </div>
  )
}
