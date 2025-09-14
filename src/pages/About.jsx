import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import AuthModal from '../components/AuthModal.jsx'
import '../assets/About.css'

export default function About() {
  const [query, setQuery] = useState('')
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  const stats = [
    { number: '10,000+', label: 'Khách hàng tin tưởng' },
    { number: '50,000+', label: 'Sản phẩm đa dạng' },
    { number: '99%', label: 'Khách hàng hài lòng' },
    { number: '24/7', label: 'Hỗ trợ khách hàng' }
  ]

  const values = [
    {
      icon: '🎯',
      title: 'Chất lượng',
      description: 'Cam kết mang đến những sản phẩm chất lượng cao, chính hãng với giá cả hợp lý.'
    },
    {
      icon: '⚡',
      title: 'Nhanh chóng',
      description: 'Giao hàng nhanh chóng, đúng hẹn với đội ngũ vận chuyển chuyên nghiệp.'
    },
    {
      icon: '🛡️',
      title: 'An toàn',
      description: 'Bảo mật thông tin khách hàng và đảm bảo giao dịch an toàn tuyệt đối.'
    },
    {
      icon: '💝',
      title: 'Tận tâm',
      description: 'Dịch vụ khách hàng tận tâm, hỗ trợ 24/7 để giải đáp mọi thắc mắc.'
    }
  ]

  const team = [
    {
      name: 'Nguyễn Văn A',
      position: 'CEO & Founder',
      avatar: '/img/team-1.jpg',
      description: 'Với hơn 10 năm kinh nghiệm trong lĩnh vực thương mại điện tử.'
    },
    {
      name: 'Trần Thị B',
      position: 'CTO',
      avatar: '/img/team-2.jpg',
      description: 'Chuyên gia công nghệ với niềm đam mê tạo ra những trải nghiệm tốt nhất.'
    },
    {
      name: 'Lê Văn C',
      position: 'Head of Marketing',
      avatar: '/img/team-3.jpg',
      description: 'Chiến lược gia marketing với tầm nhìn sáng tạo và hiệu quả.'
    },
    {
      name: 'Phạm Thị D',
      position: 'Customer Success Manager',
      avatar: '/img/team-4.jpg',
      description: 'Chuyên gia chăm sóc khách hàng với kinh nghiệm phong phú.'
    }
  ]

  const milestones = [
    {
      year: '2020',
      title: 'Thành lập công ty',
      description: 'V-Market được thành lập với tầm nhìn trở thành nền tảng thương mại điện tử hàng đầu Việt Nam.'
    },
    {
      year: '2021',
      title: 'Mở rộng thị trường',
      description: 'Mở rộng hoạt động ra toàn quốc với mạng lưới đối tác và nhà cung cấp rộng khắp.'
    },
    {
      year: '2022',
      title: 'Đạt 10,000 khách hàng',
      description: 'Đạt mốc 10,000 khách hàng thường xuyên và nhận được sự tin tưởng từ cộng đồng.'
    },
    {
      year: '2023',
      title: 'Ra mắt ứng dụng mobile',
      description: 'Phát hành ứng dụng di động để mang đến trải nghiệm mua sắm tiện lợi hơn.'
    },
    {
      year: '2024',
      title: 'Hướng tới tương lai',
      description: 'Tiếp tục phát triển và cải tiến để mang đến những giá trị tốt nhất cho khách hàng.'
    }
  ]

  return (
    <div className="about-page">
      <Header
        query={query}
        onQueryChange={setQuery}
        onOpenLogin={() => { setAuthMode('login'); setIsAuthOpen(true) }}
        onOpenRegister={() => { setAuthMode('register'); setIsAuthOpen(true) }}
      />
      
      <div className="about-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Về V-Market</h1>
            <p className="hero-subtitle">
              Nền tảng thương mại điện tử hàng đầu Việt Nam, 
              mang đến trải nghiệm mua sắm tuyệt vời cho mọi khách hàng
            </p>
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mission-section">
          <div className="section-content">
            <h2>Sứ mệnh của chúng tôi</h2>
            <p className="mission-text">
              V-Market cam kết mang đến cho khách hàng những sản phẩm chất lượng cao 
              với giá cả hợp lý, dịch vụ giao hàng nhanh chóng và hỗ trợ khách hàng tận tâm. 
              Chúng tôi tin rằng mua sắm trực tuyến không chỉ là giao dịch mà còn là trải nghiệm 
              đáng nhớ và thú vị.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="values-section">
          <div className="section-header">
            <h2>Giá trị cốt lõi</h2>
            <p>Những nguyên tắc định hướng mọi hoạt động của chúng tôi</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <div className="section-header">
            <h2>Đội ngũ của chúng tôi</h2>
            <p>Những con người tài năng đang xây dựng tương lai của V-Market</p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-avatar">
                  <img src={member.avatar} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p className="member-position">{member.position}</p>
                <p className="member-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="timeline-section">
          <div className="section-header">
            <h2>Hành trình phát triển</h2>
            <p>Những cột mốc quan trọng trong quá trình xây dựng V-Market</p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-content">
            <h2>Sẵn sàng trải nghiệm V-Market?</h2>
            <p>Tham gia cùng hàng nghìn khách hàng đã tin tưởng và lựa chọn chúng tôi</p>
            <div className="cta-buttons">
              <Link to="/" className="cta-btn primary">
                Bắt đầu mua sắm
              </Link>
              <Link to="/contact" className="cta-btn secondary">
                Liên hệ với chúng tôi
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AuthModal open={isAuthOpen} initialMode={authMode} onClose={() => setIsAuthOpen(false)} />
    </div>
  )
}
