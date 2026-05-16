import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ChevronDown,
  AlertCircle,
  MapPin,
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useCart } from '../store';
import { products } from '../data';
import { AnimatedSection, Button } from '../components/UI';
import {
  CITY_OPTIONS,
  generateWhatsAppOrderMessage,
  getWhatsAppCheckoutUrl,
  type CartItemInput,
} from '../utils/whatsapp';

/* ============================================================
   WHATSAPP SVG ICON
   ============================================================ */
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ============================================================
   CONFIRMATION MODAL
   ============================================================ */
interface ConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function OrderConfirmModal({ open, onConfirm, onCancel }: ConfirmModalProps) {
  /* Lock body scroll while open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        /* Backdrop */
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onCancel}
          />

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md glass-strong rounded-3xl p-8 shadow-2xl shadow-black/40"
          >
            {/* Close button */}
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* WhatsApp icon */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center mb-5">
              <WhatsAppIcon size={32} />
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-center mb-2">
              داواکارییەکەت ناردەوە؟
            </h2>

            {/* Subtitle */}
            <p className="text-sm text-slate-400 text-center leading-relaxed mb-8">
              ئایا داواکارییەکەت لەسەر WhatsApp ناردەوە؟
              <br />
              <span className="text-slate-500 text-xs">
                If yes, we'll clear your cart.
              </span>
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              {/* YES button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onConfirm}
                className="w-full py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/35 transition-shadow"
              >
                <CheckCircle2 size={18} />
                بەڵێ، ناردمەوە
              </motion.button>

              {/* NO button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onCancel}
                className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-medium text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                نا، هێشتا نەناردم
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   SUCCESS FEEDBACK OVERLAY
   ============================================================ */
function SuccessOverlay({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[90] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="glass-strong rounded-3xl p-10 text-center shadow-2xl shadow-cyan-500/10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', damping: 12 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-cyan-500/30"
            >
              <CheckCircle2 size={36} className="text-white" />
            </motion.div>
            <h3 className="text-xl font-bold mb-1.5">داواکارییەکەت نێردرا!</h3>
            <p className="text-sm text-slate-400">Order sent successfully</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   CART PAGE
   ============================================================ */
export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  /* City state + validation */
  const [selectedCity, setSelectedCity] = useState('');
  const [cityTouched, setCityTouched] = useState(false);

  /* Modal + success states */
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  /* Derived: resolved cart products */
  const cartProducts = useMemo(
    () =>
      items
        .map(item => ({
          ...item,
          product: products.find(p => p.id === item.productId)!,
        }))
        .filter(item => item.product),
    [items],
  );

  /* Validation */
  const cityError = cityTouched && !selectedCity;

  /* ---------------------------------------------------------
     HANDLE: WhatsApp Checkout
     1. Validate city
     2. Open WhatsApp
     3. Show confirmation modal
     --------------------------------------------------------- */
  const handleWhatsAppCheckout = useCallback(() => {
    setCityTouched(true);

    if (!selectedCity || cartProducts.length === 0) return;

    const cartItemInputs: CartItemInput[] = cartProducts.map(({ product, quantity }) => ({
      productName: product.name,
      quantity,
      unitPrice: product.price,
      subtotal: product.price * quantity,
    }));

    const message = generateWhatsAppOrderMessage(cartItemInputs, selectedCity, totalPrice);
    const url = getWhatsAppCheckoutUrl(message);

    window.open(url, '_blank');

    /* Small delay so the WhatsApp window opens first, then modal appears */
    setTimeout(() => setShowConfirmModal(true), 600);
  }, [selectedCity, cartProducts, totalPrice]);

  /* ---------------------------------------------------------
     HANDLE: "Yes, I sent it"
     Clear cart, city, close modal, flash success
     --------------------------------------------------------- */
  const handleConfirmSent = useCallback(() => {
    setShowConfirmModal(false);
    clearCart();
    setSelectedCity('');
    setCityTouched(false);

    /* Flash success overlay for 2 seconds */
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2200);
  }, [clearCart]);

  /* ---------------------------------------------------------
     HANDLE: "No, not yet"
     Just close modal, cart unchanged
     --------------------------------------------------------- */
  const handleCancelModal = useCallback(() => {
    setShowConfirmModal(false);
  }, []);

  /* ---- Empty state ---- */
  if (cartProducts.length === 0 && !showConfirmModal) {
    return (
      <>
        <div className="pt-32 pb-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <div className="w-24 h-24 rounded-3xl glass flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={40} className="text-slate-500" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
              <p className="text-slate-400 mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button variant="gradient" size="lg" to="/shop">
                <ShoppingBag size={18} /> Start Shopping
              </Button>
            </motion.div>
          </div>
        </div>
        <SuccessOverlay show={showSuccess} />
      </>
    );
  }

  /* ---- Cart with items ---- */
  return (
    <>
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <AnimatedSection>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Shopping Cart</h1>
                <p className="mt-1 text-slate-400">
                  {totalItems} item{totalItems !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={clearCart}
                className="text-sm text-slate-400 hover:text-red-400 transition-colors"
              >
                Clear All
              </button>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* ============================================================
                LEFT: Cart Items
                ============================================================ */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartProducts.map(({ product, quantity }) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="glass rounded-2xl p-4 sm:p-6"
                  >
                    <div className="flex gap-4 sm:gap-6">
                      {/* Image */}
                      <Link to={`/product/${product.id}`} className="shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <div>
                            <p className="text-[10px] text-cyan-400 uppercase tracking-wider font-semibold">
                              {product.category}
                            </p>
                            <Link to={`/product/${product.id}`}>
                              <h3 className="font-semibold text-sm sm:text-base mt-0.5 hover:text-cyan-400 transition-colors line-clamp-2">
                                {product.name}
                              </h3>
                            </Link>
                          </div>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all shrink-0"
                            aria-label="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="mt-3 flex items-end justify-between gap-4">
                          {/* Quantity */}
                          <div className="flex items-center gap-1 glass rounded-lg p-0.5">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg font-bold">
                              ${(product.price * quantity).toLocaleString()}
                            </p>
                            {quantity > 1 && (
                              <p className="text-xs text-slate-500">${product.price} each</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ============================================================
                RIGHT: Order Summary + City + WhatsApp CTA
                ============================================================ */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 space-y-4">
                {/* Order Summary Card */}
                <AnimatedSection delay={0.15}>
                  <div className="glass rounded-2xl p-6">
                    <h3 className="font-semibold text-lg mb-6">Order Summary</h3>

                    {/* Line items preview */}
                    <div className="space-y-3 mb-5">
                      {cartProducts.map(({ product, quantity }) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between gap-3 text-sm"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover shrink-0"
                            />
                            <span className="text-slate-300 truncate">{product.name}</span>
                            <span className="text-slate-500 shrink-0">×{quantity}</span>
                          </div>
                          <span className="font-medium shrink-0">
                            ${(product.price * quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10 pt-4 space-y-3 text-sm">
                      <div className="flex justify-between text-slate-400">
                        <span>Subtotal ({totalItems} items)</span>
                        <span className="text-white font-medium">${totalPrice.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between pt-3 border-t border-white/10">
                        <span className="font-semibold text-base">Total</span>
                        <span className="text-2xl font-bold neon-text-blue">
                          ${totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                {/* City Selection Card */}
                <AnimatedSection delay={0.25}>
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                        <MapPin size={16} className="text-cyan-400" />
                      </div>
                      <h3 className="font-semibold">Delivery City</h3>
                      <span className="text-[10px] text-red-400 font-semibold uppercase tracking-wider ml-auto">
                        Required
                      </span>
                    </div>

                    {/* Select dropdown */}
                    <div className="relative">
                      <select
                        value={selectedCity}
                        onChange={e => {
                          setSelectedCity(e.target.value);
                          setCityTouched(true);
                        }}
                        onBlur={() => setCityTouched(true)}
                        className={`w-full appearance-none pl-4 pr-10 py-3.5 rounded-xl text-sm transition-all cursor-pointer
                          ${
                            cityError
                              ? 'bg-red-500/5 border-2 border-red-500/50 text-red-300 focus:outline-none focus:border-red-500'
                              : selectedCity
                                ? 'bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20'
                                : 'bg-white/5 border border-white/10 text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20'
                          }
                        `}
                      >
                        <option value="" disabled className="bg-gray-900 text-slate-400">
                          شارەکەت هەڵبژێرە...
                        </option>
                        {CITY_OPTIONS.map(city => (
                          <option key={city} value={city} className="bg-gray-900 text-white">
                            {city}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                      />
                    </div>

                    {/* Validation error */}
                    <AnimatePresence>
                      {cityError && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -6, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex items-center gap-2 mt-3 px-1">
                            <AlertCircle size={14} className="text-red-400 shrink-0" />
                            <p className="text-xs text-red-400 font-medium">
                              تکایە سەرەتا شارەکەت هەڵبژێرە
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Selected city confirmation */}
                    {selectedCity && !cityError && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 flex items-center gap-2 px-1"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <p className="text-xs text-green-400/80">
                          گەیاندن بۆ {selectedCity}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </AnimatedSection>

                {/* WhatsApp Checkout CTA */}
                <AnimatedSection delay={0.35}>
                  <motion.button
                    onClick={handleWhatsAppCheckout}
                    whileHover={selectedCity ? { scale: 1.02 } : {}}
                    whileTap={selectedCity ? { scale: 0.98 } : {}}
                    disabled={cartProducts.length === 0}
                    className={`w-full relative group overflow-hidden rounded-2xl py-4 px-6 font-bold text-base flex items-center justify-center gap-3 transition-all duration-300
                      ${
                        selectedCity
                          ? 'bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40'
                          : 'bg-white/5 text-slate-500 border border-white/10 cursor-not-allowed'
                      }
                    `}
                  >
                    {/* Shimmer effect when active */}
                    {selectedCity && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      </div>
                    )}

                    <WhatsAppIcon size={22} />
                    <span className="relative">تەواوکردنی داواکاری لە WhatsApp</span>
                    <ArrowRight size={18} className="relative" />
                  </motion.button>

                  {/* Helper text */}
                  <p className="mt-3 text-center text-[11px] text-slate-500 leading-relaxed">
                    {selectedCity
                      ? 'کلیک بکە بۆ کردنەوەی WhatsApp و تەواوکردنی داواکارییەکەت'
                      : 'سەرەتا شارەکەت هەڵبژێرە بۆ بەردەوامبوون'}
                  </p>
                </AnimatedSection>

                {/* Continue Shopping */}
                <AnimatedSection delay={0.45}>
                  <Button variant="secondary" to="/shop" className="w-full">
                    Continue Shopping
                  </Button>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          MODAL: "Did you send your order on WhatsApp?"
          ============================================================ */}
      <OrderConfirmModal
        open={showConfirmModal}
        onConfirm={handleConfirmSent}
        onCancel={handleCancelModal}
      />

      {/* ============================================================
          SUCCESS FEEDBACK: brief flash after confirming
          ============================================================ */}
      <SuccessOverlay show={showSuccess} />
    </>
  );
}
