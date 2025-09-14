import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import FiltersSidebar from '../components/FiltersSidebar.jsx'
import PageHeader from '../components/PageHeader.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Pagination from '../components/Pagination.jsx'
import { PRODUCTS, CATEGORIES } from '../data/products.js'
import '../assets/SearchResults.css'
import '../assets/Components.css'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [sortBy, setSortBy] = useState('relevance')
  const [currentPage, setCurrentPage] = useState(1)

  const searchQuery = searchParams.get('q') || ''

  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS.filter(product => {
      // Search query filter
      const matchesQuery = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      // Category filter
      const matchesCategory = selectedCategory === 'Tất cả' || 
        product.category === selectedCategory
      
      // Price range filter
      const matchesPrice = (!priceRange.min || product.price >= parseInt(priceRange.min)) &&
        (!priceRange.max || product.price <= parseInt(priceRange.max))
      
      return matchesQuery && matchesCategory && matchesPrice
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
        // Mock newest - in real app would use actual date
        filtered.sort((a, b) => b.id - a.id)
        break
      default: // relevance
        // Keep original order for relevance
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, priceRange, sortBy])


  const clearFilters = () => {
    setSelectedCategory('Tất cả')
    setPriceRange({ min: '', max: '' })
    setSortBy('relevance')
  }

  const totalPages = Math.ceil(filteredProducts.length / 12) // 12 items per page

  return (
    <Layout className="search-results-page">
      <div className="search-results-container">
        <PageHeader
          title={searchQuery ? `Kết quả tìm kiếm cho "${searchQuery}"` : 'Tất cả sản phẩm'}
          resultsCount={filteredProducts.length}
        />

        <div className="search-content">
          <FiltersSidebar
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClearFilters={clearFilters}
          />

          <div className="products-section">
            {filteredProducts.length === 0 ? (
              <EmptyState
                icon="🔍"
                title="Không tìm thấy sản phẩm"
                description="Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc"
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
