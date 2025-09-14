import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-thumb" aria-label={product.name}>
        <img src={product.image} alt={product.name} />
        <button className="favorite" aria-label="Yêu thích">❤</button>
      </Link>
      <div className="product-body">
        <h4 className="product-title">{product.name}</h4>
        <div className="product-meta">
          <span className="product-price">
            {product.price.toLocaleString("vi-VN")}₫
          </span>
          <span className="product-category">{product.category}</span>
        </div>
      </div>
    </article>
  );
}

