import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../data/products'
import Header from '../components/Header.jsx'
import AuthModal from '@components/AuthModal.jsx'
import '../assets/productDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)

  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [qty, setQty] = useState(1)
  const [query, setQuery] = useState('')
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  if (!product) {
    return (
      <div className="product-detail">
        <Header
          query={query}
          onQueryChange={setQuery}
          onOpenLogin={() => { setAuthMode('login'); setIsAuthOpen(true) }}
          onOpenRegister={() => { setAuthMode('register'); setIsAuthOpen(true) }}
        />
        <div className="pd-card">
          <h2>Không tìm thấy sản phẩm</h2>
          <p><Link to="/">Quay về trang chủ</Link></p>
        </div>
        <AuthModal open={isAuthOpen} initialMode={authMode} onClose={() => setIsAuthOpen(false)} />
      </div>
    )
  }

  const vouchers = product.vouchers || []
  const colors = product.variants?.colors || []
  const sizes = product.variants?.sizes || []
  const shop = product.shop
  const specs = product.specs || []
  const description = product.description || ''

  function dec() { setQty(q => Math.max(1, q - 1)) }
  function inc() { setQty(q => q + 1) }

  return (
    <div className="product-detail">
      <Header
        query={query}
        onQueryChange={setQuery}
        onOpenLogin={() => { setAuthMode('login'); setIsAuthOpen(true) }}
        onOpenRegister={() => { setAuthMode('register'); setIsAuthOpen(true) }}
      />
      <div className="product-detail-inner">
        <div className="product-detail-media pd-card">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <div className="product-detail-price">{product.price.toLocaleString('vi-VN')}₫</div>

          <div className="pd-card">
            {vouchers.length > 0 && (
              <div className="pd-row">
                <div className="pd-label">Voucher</div>
                <div>
                  {vouchers.map(v => (
                    <span key={v} className="pd-chip">{v}</span>
                  ))}
                </div>
              </div>
            )}

            {product.shipping && (
              <div className="pd-row">
                <div className="pd-label">Vận chuyển</div>
                <div>
                  <div>Giao đến: {product.shipping.area}</div>
                  <div>Phí ship: {product.shipping.feeText}</div>
                </div>
              </div>
            )}

            {colors.length > 0 && (
              <div className="pd-row">
                <div className="pd-label">Màu sắc</div>
                <div>
                  {colors.map(c => (
                    <button key={c} className={`pd-chip ${color === c ? 'active' : ''}`} onClick={() => setColor(c)}>{c}</button>
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
              <div className="pd-row">
                <div className="pd-label">Kích thước</div>
                <div>
                  {sizes.map(s => (
                    <button key={s} className={`pd-chip ${size === s ? 'active' : ''}`} onClick={() => setSize(s)}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="pd-row">
              <div className="pd-label">Số lượng</div>
              <div>
                <div className="pd-qty">
                  <button onClick={dec}>-</button>
                  <input value={qty} onChange={() => {}} readOnly />
                  <button onClick={inc}>+</button>
                </div>
              </div>
            </div>

            <div className="pd-actions">
              <button className="add-cart">Thêm vào giỏ</button>
              <button className="buy-now">Mua ngay</button>
            </div>
          </div>

          {shop && (
            <div className="pd-card shop-card">
              <div className="shop-avatar" style={{backgroundImage: shop.avatar ? `url(${shop.avatar})` : undefined, backgroundSize:'cover'}}></div>
              <div className="shop-info">
                <h4>{shop.name}</h4>
                <p>Đánh giá: {shop.rating} • Người theo dõi: {shop.followers}</p>
              </div>
              <div className="shop-actions">
                <button>Chat ngay</button>
                <button>Xem shop</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="detail-sections">
        {specs.length > 0 && (
          <section className="detail-section">
            <h3>Chi tiết sản phẩm</h3>
            <div className="specs">
              {specs.map(([k, v]) => (
                <>
                  <div className="pd-label">{k}</div>
                  <div>{v}</div>
                </>
              ))}
            </div>
          </section>
        )}

        {description && (
          <section className="detail-section">
            <h3>Mô tả sản phẩm</h3>
            <pre style={{whiteSpace:'pre-wrap', margin:0}}>{description}</pre>
          </section>
        )}
      </div>
      <AuthModal open={isAuthOpen} initialMode={authMode} onClose={() => setIsAuthOpen(false)} />
    </div>
  )
}
