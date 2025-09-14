import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import AuthModal from '../components/AuthModal.jsx'
import '../assets/UserProfile.css'

export default function UserProfile() {
  const [query, setQuery] = useState('')
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [activeTab, setActiveTab] = useState('profile')
  
  // Mock user data
  const [userData, setUserData] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    address: '123 Đường ABC, Phường 1, Quận 1, TP.HCM',
    avatar: '/img/default-avatar.png',
    joinDate: '2024-01-15'
  })

  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState(userData)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    setUserData(formData)
    setEditMode(false)
    alert('Cập nhật thông tin thành công!')
  }

  const handleCancel = () => {
    setFormData(userData)
    setEditMode(false)
  }

  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-01-20',
      status: 'delivered',
      total: 28990000,
      items: [
        { name: 'iPhone 15 Pro', quantity: 1, price: 28990000 }
      ]
    },
    {
      id: 'ORD002',
      date: '2024-01-15',
      status: 'shipping',
      total: 1599000,
      items: [
        { name: 'Nồi Chiên Không Dầu', quantity: 1, price: 1599000 }
      ]
    },
    {
      id: 'ORD003',
      date: '2024-01-10',
      status: 'processing',
      total: 299000,
      items: [
        { name: 'Áo Hoodie Unisex', quantity: 1, price: 299000 }
      ]
    }
  ]

  const getStatusText = (status) => {
    const statusMap = {
      'processing': 'Đang xử lý',
      'shipping': 'Đang giao hàng',
      'delivered': 'Đã giao hàng',
      'cancelled': 'Đã hủy'
    }
    return statusMap[status] || status
  }

  const getStatusClass = (status) => {
    const classMap = {
      'processing': 'status-processing',
      'shipping': 'status-shipping',
      'delivered': 'status-delivered',
      'cancelled': 'status-cancelled'
    }
    return classMap[status] || ''
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  return (
    <div className="user-profile-page">
      <Header
        query={query}
        onQueryChange={setQuery}
        onOpenLogin={() => { setAuthMode('login'); setIsAuthOpen(true) }}
        onOpenRegister={() => { setAuthMode('register'); setIsAuthOpen(true) }}
      />
      
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="user-info">
            <div className="avatar">
              <img src={userData.avatar} alt="Avatar" />
            </div>
            <h3>{userData.fullName}</h3>
            <p>Thành viên từ {new Date(userData.joinDate).toLocaleDateString('vi-VN')}</p>
          </div>
          
          <nav className="profile-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Thông tin cá nhân
            </button>
            <button 
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Đơn hàng của tôi
            </button>
            <button 
              className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              Danh sách yêu thích
            </button>
            <button 
              className={`nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              Địa chỉ giao hàng
            </button>
          </nav>
        </div>

        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="profile-tab">
              <div className="tab-header">
                <h2>Thông tin cá nhân</h2>
                {!editMode ? (
                  <button className="edit-btn" onClick={() => setEditMode(true)}>
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button className="save-btn" onClick={handleSave}>
                      Lưu
                    </button>
                    <button className="cancel-btn" onClick={handleCancel}>
                      Hủy
                    </button>
                  </div>
                )}
              </div>

              <div className="profile-form">
                <div className="form-group">
                  <label>Họ và tên</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{userData.fullName}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Email</label>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{userData.email}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Số điện thoại</label>
                  {editMode ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{userData.phone}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Địa chỉ</label>
                  {editMode ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                    />
                  ) : (
                    <p>{userData.address}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-tab">
              <h2>Đơn hàng của tôi</h2>
              
              <div className="orders-list">
                {mockOrders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h3>Đơn hàng #{order.id}</h3>
                        <p>Ngày đặt: {new Date(order.date).toLocaleDateString('vi-VN')}</p>
                      </div>
                      <div className="order-status">
                        <span className={`status-badge ${getStatusClass(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                          <span className="item-price">{formatPrice(item.price)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="order-footer">
                      <div className="order-total">
                        Tổng cộng: <strong>{formatPrice(order.total)}</strong>
                      </div>
                      <div className="order-actions">
                        <button className="view-detail-btn">Xem chi tiết</button>
                        {order.status === 'delivered' && (
                          <button className="reorder-btn">Mua lại</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="wishlist-tab">
              <h2>Danh sách yêu thích</h2>
              <div className="empty-wishlist">
                <div className="empty-icon">❤️</div>
                <h3>Chưa có sản phẩm yêu thích</h3>
                <p>Hãy thêm sản phẩm vào danh sách yêu thích để dễ dàng tìm lại sau này</p>
                <Link to="/" className="browse-products-btn">
                  Khám phá sản phẩm
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="addresses-tab">
              <div className="tab-header">
                <h2>Địa chỉ giao hàng</h2>
                <button className="add-address-btn">Thêm địa chỉ mới</button>
              </div>
              
              <div className="addresses-list">
                <div className="address-card default">
                  <div className="address-info">
                    <h4>Địa chỉ mặc định</h4>
                    <p>{userData.fullName}</p>
                    <p>{userData.phone}</p>
                    <p>{userData.address}</p>
                  </div>
                  <div className="address-actions">
                    <button className="edit-address-btn">Chỉnh sửa</button>
                    <button className="delete-address-btn">Xóa</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AuthModal open={isAuthOpen} initialMode={authMode} onClose={() => setIsAuthOpen(false)} />
    </div>
  )
}
