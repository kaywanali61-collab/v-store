import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist, useCart } from '../store';
import { products } from '../data';
import { AnimatedSection, Button, StarRating } from '../components/UI';

/* ============================================================
   FALLBACK IMAGE
   ============================================================ */
const FALLBACK_IMAGE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="%231e293b"><rect width="400" height="400"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23475569" font-family="sans-serif" font-size="14">No Image</text></svg>',
  );

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  /* Resolved wishlist products */
  const wishlistProducts = useMemo(
    () =>
      wishlistItems
        .map(id => products.find(p => p.id === id))
        .filter((p): p is typeof products[0] => p !== undefined),
    [wishlistItems],
  );

  /* Handle add to cart and remove from wishlist */
  const handleAddToCart = (productId: number) => {
    addToCart(productId);
  };

  /* ---- Empty state ---- */
  if (wishlistProducts.length === 0) {
    return (
      <div className="pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="w-24 h-24 rounded-3xl glass flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-slate-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h1>
            <p className="text-slate-400 mb-8">
              Save items you love by clicking the heart icon on any product.
            </p>
            <Button variant="gradient" size="lg" to="/shop">
              <ShoppingBag size={18} /> Explore Products
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ---- Wishlist with items ---- */
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">My Wishlist</h1>
              <p className="mt-1 text-slate-400">
                {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved
              </p>
            </div>
            <button
              onClick={clearWishlist}
              className="text-sm text-slate-400 hover:text-red-400 transition-colors"
            >
              Clear All
            </button>
          </div>
        </AnimatedSection>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {wishlistProducts.map((product) => {
              const discount =
                product.originalPrice && product.originalPrice > 0 && product.price < product.originalPrice
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden"
                >
                  {/* Glow */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-500/0 via-transparent to-violet-500/0 group-hover:from-cyan-500/20 group-hover:to-violet-500/20 transition-all duration-500 blur-sm opacity-0 group-hover:opacity-100" />

                  <div className="relative">
                    {/* Image Container */}
                    <div className="relative overflow-hidden aspect-square bg-slate-900/50">
                      <Link to={`/product/${product.id}`} className="block w-full h-full">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                          onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>

                      {product.badge && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg pointer-events-none">
                          {product.badge}
                        </span>
                      )}
                      {discount > 0 && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-red-500/90 text-white pointer-events-none">
                          -{discount}%
                        </span>
                      )}

                      {/* Remove from wishlist button - Outside Link */}
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromWishlist(product.id)}
                        className={`absolute ${discount > 0 ? 'top-12' : 'top-3'} right-3 w-8 h-8 rounded-full flex items-center justify-center bg-red-500/90 text-white shadow-lg shadow-red-500/30 transition-all duration-300 z-10`}
                        aria-label="Remove from wishlist"
                      >
                        <Heart size={14} className="fill-current" />
                      </motion.button>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <Link to={`/product/${product.id}`}>
                        {product.category && <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{product.category}</p>}
                        <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-cyan-400 transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="mt-2">
                        <StarRating rating={product.rating} count={product.reviewCount} size={12} />
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold">${product.price}</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-sm text-slate-500 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAddToCart(product.id)}
                          className="flex-1 py-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center gap-2 text-xs font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow"
                        >
                          <ShoppingCart size={14} />
                          Add to Cart
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeFromWishlist(product.id)}
                          className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Continue Shopping */}
        <AnimatedSection delay={0.2}>
          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group"
            >
              Continue Shopping
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
