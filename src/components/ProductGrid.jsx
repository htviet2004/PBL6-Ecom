import ProductCard from '@components/ProductCard.jsx'

export default function ProductGrid({ products, onAdd }) {
  if (!products?.length) {
    return <div className="empty">Không tìm thấy sản phẩm phù hợp.</div>
  }

  return (
    <section className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </section>
  )
}

