import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/Register.css'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: integrate real register
    alert(`Đăng ký: ${name} / ${email}`)
  }

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Đăng ký</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <label>
            Họ và tên
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Mật khẩu
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit" className="register-btn">Tạo tài khoản</button>
        </form>
        <p className="register-alt">Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
      </div>
    </div>
  )
}

