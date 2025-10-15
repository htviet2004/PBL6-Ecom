import { useParams, Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import Header from '@components/Header.jsx'
import '../assets/Home.css'

export default function Store(){
  const { shopId } = useParams()

  // find products where shop id matches
  const numericId = Number(shopId)
  const shopProducts = PRODUCTS.filter(p => p.shop?.id === numericId)
  const shop = shopProducts.length > 0 ? shopProducts[0].shop : null

  if (!shop) {
    return (
      <div style={{padding:40}}>
        <h2>Không tìm thấy cửa hàng</h2>
        <p><Link to="/">Quay về trang chủ</Link></p>
      </div>
    )
  }

  return (
    <div style={{padding:24}}>
      <div className="pd-card shop-card" style={{alignItems:'center'}}>
        <div className="shop-avatar" style={{backgroundImage: shop.avatar ? `url(${shop.avatar})` : undefined, backgroundSize:'cover'}}></div>
        <div style={{marginLeft:12}}>
          <h2 style={{margin:0}}>{shop.name}</h2>
          <div className="pd-meta">Đánh giá: {shop.rating} • Người theo dõi: {shop.followers}</div>
        </div>
      </div>

      <section style={{marginTop:20}}>
        <h3>Sản phẩm của cửa hàng</h3>
        <div className="product-grid" style={{marginTop:12}}>
          {shopProducts.map(p => (
            <Link key={p.id} to={`/product/${p.id}`} className="product-card">
              <div className="product-thumb">
                <img src={p.image} alt={p.name} />
              </div>
              <div className="product-body">
                <h4 className="product-title">{p.name}</h4>
                <div className="product-meta">
                  <div className="product-price">{p.price.toLocaleString('vi-VN')}₫</div>
                  <div className="product-category">{p.category}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
