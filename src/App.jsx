import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@components/Header.jsx";
import CategoryNav from "@components/CategoryNav.jsx";
import PromoAside from "@components/PromoAside.jsx";
import ProductGrid from "@components/ProductGrid.jsx";
import HeroSlider from "@components/HeroSlider.jsx";
import AuthModal from "@components/AuthModal.jsx";
import Footer from "@components/Footer.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Store from "./pages/Store.jsx";
import SellerDashboard from "./pages/SellerDashboard.jsx";
import SellerOrders from "./pages/SellerOrders.jsx";
import ProductAnalytics from "./pages/ProductAnalytics.jsx";
import { CATEGORIES, PRODUCTS } from "./data/products.js";
import "./assets/Home.css";
import hero1 from "./assets/img/hero-slider1.png";
import hero2 from "./assets/img/hero2.png";

function Home({ currentUser, onLogin, onLogout, onRegister }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCategory =
        activeCategory === "Tất cả" || p.category === activeCategory;
      const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="marketplace-root">
      <Header
        query={query}
        onQueryChange={setQuery}
        onOpenLogin={() => {
          setAuthMode("login");
          setIsAuthOpen(true);
        }}
        onOpenRegister={() => {
          setAuthMode("register");
          setIsAuthOpen(true);
        }}
        currentUser={currentUser}
        onLogout={onLogout}
      />

      {/* Hero slider placed above categories */}
      <HeroSlider slides={[
        { image: hero1, title: 'Mùa giảm giá lớn', subtitle: 'Ưu đãi lên đến 50%', cta: { href: '/category/khuyen-mai', label: 'Xem ngay' } },
        { image: hero2, title: 'Bộ sưu tập mới', subtitle: 'Sản phẩm hot mùa này', cta: { href: '/category/bo-suu-tap', label: 'Khám phá' } }
      ]} />

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

      <AuthModal
        open={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          onLogin(user);
          setIsAuthOpen(false);
        }}
        onRegisterSuccess={(user) => {
          onRegister(user);
          setIsAuthOpen(false);
        }}
      />
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  function handleLogin(user) {
    setCurrentUser(user);
  }

  function handleRegister(user) {
    setCurrentUser(user);
  }

  function handleLogout() {
    setCurrentUser(null);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Home
              currentUser={currentUser}
              onLogin={handleLogin}
              onRegister={handleRegister}
              onLogout={handleLogout}
            />
          }
        />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/shop/:shopId" element={<Store />} />
        <Route path="/seller/:shopId/dashboard" element={<SellerDashboard />} />
  <Route path="/seller/:shopId/orders" element={<SellerOrders />} />
  <Route path="/seller/:shopId/products/:productId/analytics" element={<ProductAnalytics />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}
