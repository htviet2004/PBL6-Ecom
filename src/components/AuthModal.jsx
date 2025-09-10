import { useState } from 'react'
import '../assets/authPages.css'

export default function AuthModal({ open, initialMode = 'login', onClose }) {
  const [mode, setMode] = useState(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  if (!open) return null

  function handleSubmit(e) {
    e.preventDefault()
    if (mode === 'login') {
      alert(`Đăng nhập với: ${email}`)
    } else {
      alert(`Đăng ký: ${name} / ${email}`)
    }
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => setMode('login')}
          >Đăng nhập</button>
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => setMode('register')}
          >Đăng ký</button>
          <button className="auth-close" aria-label="Đóng" onClick={onClose}>×</button>
        </div>

        <div className="auth-card">
          <h2>{mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            {mode === 'register' && (
              <label>
                Họ và tên
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
            )}
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Mật khẩu
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit" className="auth-btn">{mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

