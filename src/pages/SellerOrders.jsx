import { useMemo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSellerOrders, setSellerOrders } from '../utils/storage'
import '../assets/Home.css'

export default function SellerOrders(){
  const { shopId } = useParams()
  const id = Number(shopId)
  const [orders, setOrders] = useState(() => getSellerOrders(id))
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => { setSellerOrders(id, orders) }, [id, orders])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return orders.filter(o => {
      const inId = !q || o.id.toLowerCase().includes(q)
      const inStatus = !status || o.status === status
      return inId && inStatus
    })
  }, [orders, query, status])

  function updateStatus(orderId, next){
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: next } : o))
  }

  return (
    <div style={{padding:24}}>
      <h2>Quản lý đơn hàng</h2>
      <div style={{display:'flex', gap:12, alignItems:'center'}}>
        <input className="search-input" style={{maxWidth:300}} placeholder="Tìm theo mã đơn..." value={query} onChange={e=>setQuery(e.target.value)} />
        <select className="search-input" style={{maxWidth:200}} value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ xử lý</option>
          <option value="shipped">Đã gửi</option>
          <option value="completed">Hoàn tất</option>
          <option value="canceled">Đã hủy</option>
        </select>
      </div>

      <div className="pd-card" style={{marginTop:16}}>
        {filtered.length === 0 && <div>Không có đơn hàng phù hợp.</div>}
        {filtered.map(o => (
          <div key={o.id} className="pd-row" style={{gridTemplateColumns:'1fr auto', alignItems:'center'}}>
            <div>
              <div><strong>Mã đơn:</strong> {o.id}</div>
              <div><strong>Ngày:</strong> {new Date(o.date).toLocaleString('vi-VN')}</div>
              <div>
                <strong>Sản phẩm:</strong> {o.items.map(i => `${i.name} x${i.qty}`).join(', ')} — Tổng: {o.items.reduce((s,i)=>s+i.qty*i.price,0).toLocaleString('vi-VN')}₫
              </div>
            </div>
            <div>
              <select className="search-input" value={o.status} onChange={e=>updateStatus(o.id, e.target.value)}>
                <option value="pending">Chờ xử lý</option>
                <option value="shipped">Đã gửi</option>
                <option value="completed">Hoàn tất</option>
                <option value="canceled">Đã hủy</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
