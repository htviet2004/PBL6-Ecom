import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSellerOrders } from '../utils/storage'
import { PRODUCTS } from '../data/products'
import '../assets/Home.css'

export default function ProductAnalytics(){
  const { shopId, productId } = useParams()
  const sid = Number(shopId)
  const pid = Number(productId)

  // try find in persisted products or seed PRODUCTS
  const product = PRODUCTS.find(p => p.id === pid) || null
  const orders = getSellerOrders(sid)

  const metrics = useMemo(() => {
    const related = orders.flatMap(o => o.items.filter(i => i.productId === pid))
    const units = related.reduce((s,i)=> s + i.qty, 0)
    const revenue = related.reduce((s,i)=> s + i.qty*i.price, 0)
    return { units, revenue, orders: related.length }
  }, [orders, pid])

  return (
    <div style={{padding:24}}>
      <Link to={`/seller/${sid}/dashboard`} className="action-btn">← Quay lại Dashboard</Link>
      <h2>Thống kê sản phẩm</h2>
      {product ? (
        <div className="pd-card" style={{display:'grid', gridTemplateColumns:'160px 1fr', gap:16}}>
          <div className="product-thumb" style={{height:140}}><img src={product.image} alt={product.name} /></div>
          <div>
            <h3 style={{marginTop:0}}>{product.name}</h3>
            <div className="pd-row" style={{gridTemplateColumns:'200px 1fr'}}>
              <div className="pd-label">Doanh thu</div>
              <div>{metrics.revenue.toLocaleString('vi-VN')}₫</div>
              <div className="pd-label">Số lượng đã bán</div>
              <div>{metrics.units}</div>
              <div className="pd-label">Số lượt đơn hàng</div>
              <div>{metrics.orders}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>Không tìm thấy sản phẩm.</div>
      )}

      <section className="detail-section" style={{marginTop:16}}>
        <h3>Đơn hàng liên quan</h3>
        <div className="pd-card">
          {orders.filter(o => o.items.some(i => i.productId === pid)).map(o => (
            <div key={o.id} className="pd-row" style={{gridTemplateColumns:'180px 1fr'}}>
              <div className="pd-label">{new Date(o.date).toLocaleString('vi-VN')}</div>
              <div>
                {o.items.filter(i => i.productId === pid).map(i => (
                  <div key={o.id+"-"+i.productId}>{i.name} x{i.qty} — {(i.qty*i.price).toLocaleString('vi-VN')}₫</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
