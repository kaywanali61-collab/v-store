import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  ChevronUp,
  Mail,
  MapPin,
  Phone,
  Globe,
  MessageSquare,
  Camera,
  Play,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '../store';
import { searchProducts, type Product } from '../data';

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const { totalItems } = useCart();
  const location = useLocation();

  /* Track scroll for header bg */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close menus on route change */
  useEffect(() => {
    setIsMobileOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location]);

  /* Search results */
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      setSearchResults(searchProducts(searchQuery).slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const closeMobileMenu = useCallback(() => setIsMobileOpen(false), []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/categories', label: 'Categories' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-strong py-2.5 shadow-lg shadow-black/20'
            : 'bg-transparent py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-bold text-sm shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                V
              </div>
              <span className="text-xl font-bold tracking-tight">
                V <span className="text-slate-400 font-normal">Store</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-cyan-400 bg-cyan-400/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                aria-label="Cart"
              >
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-[10px] flex items-center justify-center font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Hamburger — only visible below lg */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all relative z-[70]"
                aria-label="Menu"
              >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search Overlay */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 relative">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      placeholder="Search products, categories..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-2xl overflow-hidden z-50">
                      {searchResults.map(product => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                        >
                          <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{product.name}</p>
                            <p className="text-sm text-cyan-400">${product.price}</p>
                          </div>
                        </Link>
                      ))}
                      <Link
                        to={`/shop?q=${encodeURIComponent(searchQuery)}`}
                        className="block p-3 text-center text-sm text-cyan-400 hover:bg-white/5 transition-colors border-t border-white/5"
                      >
                        View all results →
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ============================================================
          MOBILE MENU
          ============================================================ */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#060a14]/95 backdrop-blur-2xl"
              onClick={closeMobileMenu}
            />

            {/* Ambient glow */}
            <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-cyan-500/[0.07] blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-violet-500/[0.07] blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

            {/* Panel */}
            <motion.nav
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.35, delay: 0.05, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative h-full flex flex-col"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4">
                <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-bold text-sm shadow-lg shadow-cyan-500/20">V</div>
                  <span className="text-xl font-bold tracking-tight">V <span className="text-slate-400 font-normal">Store</span></span>
                </Link>
                <button onClick={closeMobileMenu} className="w-11 h-11 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all" aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>

              <div className="mx-6 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

              {/* Nav links */}
              <div className="flex-1 flex flex-col justify-center px-6 py-8">
                <div className="space-y-2">
                  {navLinks.map((link, i) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.08 + i * 0.05, ease: [0.25, 0.4, 0.25, 1] }}
                      >
                        <Link
                          to={link.path}
                          onClick={closeMobileMenu}
                          className={`group flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold transition-all duration-200 ${
                            isActive
                              ? 'bg-cyan-400/[0.08] text-cyan-400 border border-cyan-400/20'
                              : 'text-slate-300 hover:text-white hover:bg-white/[0.04] border border-transparent'
                          }`}
                        >
                          <span>{link.label}</span>
                          {isActive ? (
                            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                          ) : (
                            <ArrowRight size={16} className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom section */}
              <div className="px-6 pb-8 space-y-4">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Cart button — full width */}
                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl glass text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all"
                >
                  <ShoppingCart size={16} />
                  <span>Cart</span>
                  {totalItems > 0 && (
                    <span className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-[10px] flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </Link>

                <p className="text-center text-[11px] text-slate-600 tracking-wider uppercase">
                  Next-gen tech, delivered with style
                </p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative mt-20">
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Stay Ahead of the <span className="neon-text">Curve</span>
            </h3>
            <p className="text-slate-400 mb-8">
              Get exclusive deals, early access to new products, and tech insights delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 btn-gradient rounded-xl font-semibold text-sm text-white hover:scale-105 active:scale-95 transition-transform"
              >
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 bg-gray-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-bold text-sm">V</div>
                <span className="text-xl font-bold tracking-tight">V Store</span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Next-generation tech, delivered with style. Premium electronics and gaming gear for the modern digital lifestyle.
              </p>
              <div className="flex gap-3">
                {[Globe, MessageSquare, Camera, Play].map((Icon, i) => (
                  <button key={i} className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all" aria-label="Social media">
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2.5">
                {[
                  { to: '/shop', label: 'Shop All' },
                  { to: '/categories', label: 'Categories' },
                  { to: '/about', label: 'About Us' },
                  { to: '/contact', label: 'Contact' },
                  { to: '/faq', label: 'FAQ' },
                ].map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-4 text-white">Support</h4>
              <ul className="space-y-2.5">
                {['Shipping & Delivery', 'Returns & Refunds', 'Warranty', 'Track Order', 'Live Chat'].map(item => (
                  <li key={item}>
                    <span className="text-sm text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-4 text-white">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-400">
                  <MapPin size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                  <span>Erbil, Kurdistan Region, Iraq</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-400">
                  <Phone size={16} className="text-cyan-400 shrink-0" />
                  <span>+964 750 000 0000</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-400">
                  <Mail size={16} className="text-cyan-400 shrink-0" />
                  <span>hello@vstore.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">© {new Date().getFullYear()} V Store. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-slate-500">
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Cookies</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   SCROLL TO TOP
   ============================================================ */
function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   LAYOUT WRAPPER
   ============================================================ */
export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
