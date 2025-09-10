import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "@components/Header.jsx";
import CategoryNav from "@components/CategoryNav.jsx";
import PromoAside from "@components/PromoAside.jsx";
import ProductGrid from "@components/ProductGrid.jsx";
import AuthModal from '@components/AuthModal.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import { CATEGORIES, PRODUCTS } from './data/products.js'

function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCategory = activeCategory === "Tất cả" || p.category === activeCategory;
      const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="marketplace-root">
      <Header
        query={query}
        onQueryChange={setQuery}
        onOpenLogin={() => { setAuthMode('login'); setIsAuthOpen(true) }}
        onOpenRegister={() => { setAuthMode('register'); setIsAuthOpen(true) }}
      />

      <CategoryNav
        categories={CATEGORIES}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      <main className="content">
        <PromoAside />
        <ProductGrid products={filteredProducts} onAdd={() => {}} />
      </main>

      <footer className="footer">
        <div className="footer-col">
          <h5>Về V-Market</h5>
          <ul>
            <li>Giới thiệu</li>
            <li>Tuyển dụng</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Hỗ trợ</h5>
          <ul>
            <li>Trung tâm trợ giúp</li>
            <li>Hướng dẫn mua hàng</li>
            <li>Trả hàng & Hoàn tiền</li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Kết nối</h5>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>TikTok</li>
          </ul>
        </div>
      </footer>

      <AuthModal open={isAuthOpen} initialMode={authMode} onClose={() => setIsAuthOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  )
}