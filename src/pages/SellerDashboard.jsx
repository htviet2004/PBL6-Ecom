import { useMemo, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { getSellerProducts, setSellerProducts, ensureSampleOrders } from '../utils/storage'
import '../assets/Home.css'

export default function SellerDashboard(){
  const { shopId } = useParams()
  const id = Number(shopId)

  // seed from PRODUCTS then load from localStorage
  const seed = PRODUCTS.filter(p => p.shop?.id === id)
  const [items, setItems] = useState(() => getSellerProducts(id, seed))
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name:'', price:'', category:'', image:'' })
  const [query, setQuery] = useState('')

  useEffect(() => { setSellerProducts(id, items) }, [id, items])
  useEffect(() => { ensureSampleOrders(id, items) }, [id, items])

  function startAdd(){ setEditing('new'); setForm({ name:'', price:'', category:'', image:'' }) }
  function startEdit(p){ setEditing(p.id); setForm({ name:p.name, price:p.price, category:p.category, image:p.image || '' }) }
  function save(){
    if(editing === 'new'){
      const next = { id: Date.now(), ...form, price: Number(form.price), shop: { id } }
      setItems([next, ...items])
    } else {
      setItems(items.map(it => it.id === editing ? { ...it, ...form, price: Number(form.price) } : it))
    }
    setEditing(null)
  }
  function remove(id){ setItems(items.filter(i => i.id !== id)) }

  const shopName = items[0]?.shop?.name || `Cửa hàng ${id}`
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(p => p.name.toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q))
  }, [items, query])

  return (
    <div style={{padding:24}}>
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <h2>Bảng điều khiển người bán — {shopName}</h2>
        <Link to={`/shop/${id}`} className="action-btn">Xem cửa hàng</Link>
      </div>

      <div style={{marginTop:16, display:'flex', gap:12, alignItems:'center'}}>
        <button className="btn btn-primary" onClick={startAdd}>Thêm sản phẩm</button>
        <input className="search-input" style={{maxWidth:320}} placeholder="Tìm theo tên, danh mục..." value={query} onChange={e=>setQuery(e.target.value)} />
        <Link to={`/seller/${id}/orders`} className="action-btn">Quản lý đơn hàng</Link>
      </div>

      <div style={{marginTop:16}}>
        {editing && (
          <div className="pd-card">
            <label>Tên sản phẩm<br /><input value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} /></label>
            <label>Giá (VND)<br /><input value={form.price} onChange={e=>setForm(f=>({...f, price:e.target.value}))} /></label>
            <label>Danh mục<br /><input value={form.category} onChange={e=>setForm(f=>({...f, category:e.target.value}))} /></label>
            <label>Ảnh (URL)<br /><input placeholder="https://...jpg" value={form.image} onChange={e=>setForm(f=>({...f, image:e.target.value}))} /></label>
            <div style={{marginTop:10}}>
              <button className="btn btn-primary" onClick={save}>Lưu</button>
              <button className="btn btn-secondary" onClick={()=>setEditing(null)} style={{marginLeft:8}}>Hủy</button>
            </div>
          </div>
        )}

        <div className="product-grid" style={{marginTop:12}}>
          {filtered.map(p => (
            <div key={p.id} className="product-card">
              <div className="product-thumb"><img src={p.image} alt={p.name} /></div>
              <div className="product-body">
                <h4 className="product-title">
                  <Link to={`/seller/${id}/products/${p.id}/analytics`} style={{textDecoration:'none', color:'inherit'}}>{p.name}</Link>
                </h4>
                <div className="product-meta">
                  <div className="product-price">{(p.price || 0).toLocaleString('vi-VN')}₫</div>
                </div>
                <div style={{display:'flex', gap:8, marginTop:8}}>
                  <button className="action-btn" onClick={()=>startEdit(p)}>Sửa</button>
                  <button className="action-btn" onClick={()=>remove(p.id)}>Xóa</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
