import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, WishlistProvider } from './store';
import { ErrorBoundary } from './components/ErrorBoundary';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <CartProvider>
          <WishlistProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="categories" element={<Categories />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="cart" element={<Cart />} />
              <Route path="wishlist" element={<Wishlist />} />
            </Route>
          </Routes>
        </WishlistProvider>
        </CartProvider>
      </HashRouter>
    </ErrorBoundary>
  );
}
