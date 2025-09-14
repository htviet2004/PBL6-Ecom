import { useState } from 'react'
import Header from '../components/Header.jsx'
import AuthModal from '../components/AuthModal.jsx'
import '../assets/Contact.css'

export default function Contact() {
  const [query, setQuery] = useState('')
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ tên'
    if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email'
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại'
    if (!formData.subject.trim()) newErrors.subject = 'Vui lòng nhập chủ đề'
    if (!formData.message.trim()) newErrors.message = 'Vui lòng nhập nội dung tin nhắn'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      setIsSubmitting(false)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: '📍',
      title: 'Địa chỉ',
      content: '123 Đường ABC, Phường 1, Quận 1, TP. Hồ Chí Minh'
    },
    {
      icon: '📞',
      title: 'Điện thoại',
      content: '0123 456 789'
    },
    {
      icon: '✉️',
      title: 'Email',
      content: 'contact@vmarket.com'
    },
    {
      icon: '🕒',
      title: 'Giờ làm việc',
      content: 'Thứ 2 - Thứ 6: 8:00 - 17:30\nThứ 7: 8:00 - 12:00'
    }
  ]

  const faqs = [
    {
      question: 'Làm thế nào để đặt hàng?',
      answer: 'Bạn có thể đặt hàng trực tiếp trên website bằng cách thêm sản phẩm vào giỏ hàng và tiến hành thanh toán.'
    },
    {
      question: 'Thời gian giao hàng là bao lâu?',
      answer: 'Thời gian giao hàng từ 1-3 ngày làm việc tùy thuộc vào khu vực giao hàng.'
    },
    {
      question: 'Có hỗ trợ đổi trả không?',
      answer: 'Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày kể từ ngày nhận hàng với điều kiện sản phẩm còn nguyên vẹn.'
    },
    {
      question: 'Phương thức thanh toán nào được hỗ trợ?',
      answer: 'Chúng tôi hỗ trợ thanh toán COD, chuyển khoản ngân hàng và ví điện tử MoMo.'
    }
  ]

  return (
    <div className="contact-page">
      <Header
        query={query}
        onQueryChange={setQuery}
        onOpenLogin={() => { setAuthMode('login'); setIsAuthOpen(true) }}
        onOpenRegister={() => { setAuthMode('register'); setIsAuthOpen(true) }}
      />
      
      <div className="contact-container">
        <div className="contact-header">
          <h1>Liên hệ với chúng tôi</h1>
          <p>Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn</p>
        </div>

        <div className="contact-content">
          <div className="contact-info-section">
            <h2>Thông tin liên hệ</h2>
            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-card">
                  <div className="info-icon">{info.icon}</div>
                  <h3>{info.title}</h3>
                  <p>{info.content}</p>
                </div>
              ))}
            </div>

            <div className="map-section">
              <h3>Vị trí của chúng tôi</h3>
              <div className="map-placeholder">
                <div className="map-content">
                  <div className="map-icon">🗺️</div>
                  <p>Bản đồ sẽ được hiển thị tại đây</p>
                  <small>123 Đường ABC, Phường 1, Quận 1, TP. Hồ Chí Minh</small>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>Gửi tin nhắn cho chúng tôi</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Họ và tên *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Nhập họ và tên"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
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
              </div>

              <div className="form-row">
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
                
                <div className="form-group">
                  <label htmlFor="subject">Chủ đề *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={errors.subject ? 'error' : ''}
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="support">Hỗ trợ kỹ thuật</option>
                    <option value="order">Đơn hàng</option>
                    <option value="return">Đổi trả</option>
                    <option value="feedback">Góp ý</option>
                    <option value="other">Khác</option>
                  </select>
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Nội dung tin nhắn *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={errors.message ? 'error' : ''}
                  placeholder="Nhập nội dung tin nhắn..."
                  rows="6"
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </button>
            </form>
          </div>
        </div>

        <div className="faq-section">
          <h2>Câu hỏi thường gặp</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AuthModal open={isAuthOpen} initialMode={authMode} onClose={() => setIsAuthOpen(false)} />
    </div>
  )
}
