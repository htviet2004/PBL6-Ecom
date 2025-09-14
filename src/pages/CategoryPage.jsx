import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import FiltersSidebar from '../components/FiltersSidebar.jsx'
import PageHeader from '../components/PageHeader.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Pagination from '../components/Pagination.jsx'
import { PRODUCTS, CATEGORIES } from '../data/products.js'
import '../assets/CategoryPage.css'
import '../assets/Components.css'

export default function CategoryPage() {
  const { categoryName } = useParams()
  
  // Filter states
  const [query, setQuery] = useState('')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [sortBy, setSortBy] = useState('relevance')
  const [currentPage, setCurrentPage] = useState(1)

  // Decode category name from URL
  const decodedCategory = decodeURIComponent(categoryName || '')
  const currentCategory = CATEGORIES.find(cat => cat === decodedCategory) || 'Tất cả'

  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS.filter(product => {
      // Category filter
      const matchesCategory = currentCategory === 'Tất cả' || 
        product.category === currentCategory
      
      // Search query filter
      const matchesQuery = !query || 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      
      // Price range filter
      const matchesPrice = (!priceRange.min || product.price >= parseInt(priceRange.min)) &&
        (!priceRange.max || product.price <= parseInt(priceRange.max))
      
      return matchesCategory && matchesQuery && matchesPrice
    })

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
        filtered.sort((a, b) => b.id - a.id)
        break
      default: // relevance
        break
    }

    return filtered
  }, [currentCategory, query, priceRange, sortBy])


  const clearFilters = () => {
    setQuery('')
    setPriceRange({ min: '', max: '' })
    setSortBy('relevance')
  }

  const getCategoryDescription = (category) => {
    const descriptions = {
      'Điện thoại': 'Khám phá các mẫu điện thoại thông minh mới nhất với công nghệ tiên tiến',
      'Laptop': 'Laptop hiệu năng cao, phù hợp cho công việc và giải trí',
      'Thời trang': 'Thời trang hiện đại, phong cách và chất lượng cao',
      'Mỹ phẩm': 'Mỹ phẩm chính hãng, an toàn cho làn da',
      'Gia dụng': 'Đồ gia dụng thông minh, tiện ích cho cuộc sống',
      'Thể thao': 'Đồ thể thao chất lượng, hỗ trợ tối đa cho hoạt động',
      'Đồ chơi': 'Đồ chơi an toàn, kích thích sáng tạo cho trẻ em'
    }
    return descriptions[category] || 'Khám phá các sản phẩm chất lượng cao'
  }

  const totalPages = Math.ceil(filteredProducts.length / 12) // 12 items per page

  return (
    <Layout className="category-page">
      <div className="category-container">
        <PageHeader
          title={currentCategory}
          subtitle={getCategoryDescription(currentCategory)}
          resultsCount={filteredProducts.length}
          breadcrumb={[
            { text: 'Trang chủ', link: '/' },
            { text: currentCategory }
          ]}
          className="category-header"
        />

        <div className="category-content">
          <FiltersSidebar
            categories={CATEGORIES}
            selectedCategory={currentCategory}
            onCategoryChange={() => {}}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClearFilters={clearFilters}
            showCategoryLinks={true}
          />

          <div className="products-section">
            {filteredProducts.length === 0 ? (
              <EmptyState
                icon="📦"
                title="Không có sản phẩm nào"
                description="Hiện tại chưa có sản phẩm nào trong danh mục này"
                actionText="Xem tất cả sản phẩm"
                actionLink="/"
                className="no-results"
              />
            ) : (
              <>
                <ProductGrid products={filteredProducts} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
