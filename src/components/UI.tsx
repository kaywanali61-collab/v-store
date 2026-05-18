import { type ReactNode, useState, useEffect, useRef, Component, type ErrorInfo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ShoppingCart, Star, Minus, Plus, Heart } from 'lucide-react';
import { useCart, useWishlist } from '../store';
import type { Product } from '../data';

/* ============================================================
   ANIMATED SECTION
   ============================================================ */
export function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   STAGGER CONTAINER
   ============================================================ */
export function StaggerContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   SECTION HEADING
   ============================================================ */
export function SectionHeading({
  badge,
  title,
  subtitle,
  center = true,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {badge && (
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

/* ============================================================
   BUTTON COMPONENT
   ============================================================ */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gradient' | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  to,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  const sizeClasses = { sm: 'px-4 py-2 text-xs gap-1.5', md: 'px-6 py-3 text-sm gap-2', lg: 'px-8 py-4 text-base gap-2.5' };
  const variantClasses = {
    primary: 'bg-white text-gray-950 hover:bg-slate-200',
    secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20',
    ghost: 'text-slate-400 hover:text-white hover:bg-white/5',
    gradient: 'btn-gradient text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02]',
    outline: 'border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50',
  };
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (to) return <Link to={to} className={classes}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}

/* ============================================================
   STAR RATING
   ============================================================ */
export function StarRating({ rating, count, size = 14 }: { rating: number; count?: number; size?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <Star key={star} size={size} className={star <= Math.round(rating ?? 0) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'} />
        ))}
      </div>
      <span className="text-xs text-slate-400">
        {rating ?? 0}
        {count !== undefined && <span className="text-slate-500"> ({count})</span>}
      </span>
    </div>
  );
}

/* ============================================================
   PER-CARD ERROR BOUNDARY
   ============================================================ */
interface CardEBProps { children: ReactNode }
interface CardEBState { hasError: boolean }

class CardErrorBoundary extends Component<CardEBProps, CardEBState> {
  state: CardEBState = { hasError: false };
  static getDerivedStateFromError(): CardEBState { return { hasError: true }; }
  componentDidCatch(e: Error, i: ErrorInfo) { console.warn('[V Store] Card error suppressed:', e.message, i.componentStack); }
  render() { return this.state.hasError ? null : this.props.children; }
}

/* ============================================================
   FALLBACK IMAGE
   ============================================================ */
const FALLBACK_IMAGE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="%231e293b"><rect width="400" height="400"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23475569" font-family="sans-serif" font-size="14">No Image</text></svg>',
  );

/* ============================================================
   PRODUCT CARD
   ============================================================ */
export function ProductCard({ product }: { product: Product }) {
  return (
    <CardErrorBoundary>
      <ProductCardInner product={product} />
    </CardErrorBoundary>
  );
}

function ProductCardInner({ product }: { product: Product }) {
  if (!product || !product.id) return null;

  const id = product.id;
  const name = product.name ?? 'Unnamed Product';
  const price = product.price ?? 0;
  const originalPrice = product.originalPrice;
  const image = product.image || FALLBACK_IMAGE;
  const category = product.category ?? '';
  const rating = product.rating ?? 0;
  const reviewCount = product.reviewCount ?? 0;
  const badge = product.badge;

  const discount =
    originalPrice && originalPrice > 0 && price < originalPrice
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -6 }}
      className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-500/0 via-transparent to-violet-500/0 group-hover:from-cyan-500/20 group-hover:to-violet-500/20 transition-all duration-500 blur-sm opacity-0 group-hover:opacity-100" />

      <div className="relative">
        {/* Image */}
        <Link to={`/product/${id}`} className="block relative overflow-hidden aspect-square bg-slate-900/50">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {badge && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg">
              {badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-red-500/90 text-white">
              -{discount}%
            </span>
          )}

          {/* Wishlist Heart Button */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(id);
            }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
              inWishlist 
                ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/30' 
                : 'bg-black/40 text-white/80 hover:bg-black/60 hover:text-white opacity-0 group-hover:opacity-100'
            } ${discount > 0 ? 'top-12' : 'top-3'}`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={14} className={inWishlist ? 'fill-current' : ''} />
          </motion.button>
        </Link>

        {/* Info */}
        <div className="p-4">
          <Link to={`/product/${id}`}>
            {category && <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{category}</p>}
            <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-cyan-400 transition-colors">
              {name}
            </h3>
          </Link>

          <div className="mt-2">
            <StarRating rating={rating} count={reviewCount} size={12} />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold">${price}</span>
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-slate-500 line-through">${originalPrice}</span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => addToCart(id)}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow"
              aria-label="Add to cart"
            >
              <ShoppingCart size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   PRODUCT GRID
   ============================================================ */
export function ProductGrid({ products, className = '' }: { products: Product[]; className?: string }) {
  return (
    <StaggerContainer className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ${className}`}>
      {Array.isArray(products) && products.map((product) => (
        <ProductCard key={product.id ?? Math.random()} product={product} />
      ))}
    </StaggerContainer>
  );
}

/* ============================================================
   QUANTITY SELECTOR
   ============================================================ */
export function QuantitySelector({ quantity, onChange }: { quantity: number; onChange: (qty: number) => void }) {
  return (
    <div className="flex items-center gap-1 glass rounded-xl p-1">
      <button onClick={() => onChange(Math.max(1, quantity - 1))} className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
        <Minus size={16} />
      </button>
      <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
      <button onClick={() => onChange(quantity + 1)} className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
        <Plus size={16} />
      </button>
    </div>
  );
}

/* ============================================================
   COUNTDOWN TIMER
   ============================================================ */
export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = Math.max(0, targetDate.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const blocks = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hrs' },
    { value: minutes, label: 'Min' },
    { value: seconds, label: 'Sec' },
  ];

  return (
    <div className="flex gap-3">
      {blocks.map(block => (
        <div key={block.label} className="text-center">
          <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold tabular-nums">
            {String(block.value).padStart(2, '0')}
          </div>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{block.label}</p>
        </div>
      ))}
    </div>
  );
}
