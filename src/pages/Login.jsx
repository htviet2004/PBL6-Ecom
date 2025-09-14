import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: integrate real auth
    alert(`Đăng nhập với: ${email}`)
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Mật khẩu
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit" className="login-btn">Đăng nhập</button>
        </form>
        <p className="login-alt">Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
      </div>
    </div>
  )
}

