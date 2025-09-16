import { useState, useEffect } from 'react'
import { USERS, getUserByEmail } from '../data/user'
import '../assets/authPages.css'

export default function AuthModal({ open, initialMode = 'login', onClose, onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  // reset form mỗi khi mở modal
  useEffect(() => {
    if (open) {
      setMode(initialMode)
      setEmail('')
      setPassword('')
      setName('')
    }
  }, [open, initialMode])

  if (!open) return null

  function handleSubmit(e) {
    e.preventDefault()

    if (mode === 'login') {
      const user = getUserByEmail(email)
      if (user && user.password === password) {
        onLoginSuccess?.(user)   // báo cho App biết user đã login
        onClose()                // đóng modal
      } else {
        alert('Sai email hoặc mật khẩu')
      }
    } else {
      // kiểm tra nếu email đã tồn tại
      const existed = getUserByEmail(email)
      if (existed) {
        alert('Email đã được đăng ký!')
      } else {
        const newUser = { id: USERS.length + 1, name, email, password }
        USERS.push(newUser)
        alert(`Đăng ký thành công! Xin chào ${name}`)
        onLoginSuccess?.(newUser) // đăng ký xong coi như login luôn
        onClose()
      }
    }
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => setMode('login')}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => setMode('register')}
          >
            Đăng ký
          </button>
          <button
            type="button"
            className="auth-close"
            aria-label="Đóng"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="auth-card">
          <h2>{mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            {mode === 'register' && (
              <label>
                Họ và tên
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
            )}
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Mật khẩu
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="auth-btn">
              {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
