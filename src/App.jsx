import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Header from "@components/Header.jsx";
import CategoryNav from "@components/CategoryNav.jsx";
import PromoAside from "@components/PromoAside.jsx";
import ProductGrid from "@components/ProductGrid.jsx";
import AuthModal from '@components/AuthModal.jsx'
import Footer from '@components/Footer.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import UserProfile from './pages/UserProfile.jsx'
import SearchResults from './pages/SearchResults.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import { CATEGORIES, PRODUCTS } from './data/products.js'
import './assets/Home.css'

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
        <ProductGrid products={filteredProducts} />
      </main>

      <Footer />

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
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </BrowserRouter>
  )
}