import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Minus, Plus, ChevronRight, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button, AnimatedSection, StarRating, ProductCard, SectionHeading } from '../components/UI';
import { useCart } from '../store';
import { getProduct, products } from '../data';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(Number(id));
  const { addToCart, items: cartItems } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [addedToCart, setAddedToCart] = useState(false);

  const inCart = useMemo(
    () => cartItems.find(i => i.productId === product?.id),
    [cartItems, product]
  );

  const relatedProducts = useMemo(
    () =>
      product
        ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
        : [],
    [product]
  );

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-cyan-400 hover:underline">← Back to Shop</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <AnimatedSection>
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRight size={14} />
            <Link to={`/shop?category=${product.category}`} className="hover:text-white transition-colors capitalize">
              {product.category}
            </Link>
            <ChevronRight size={14} />
            <span className="text-slate-300 truncate max-w-[200px]">{product.name}</span>
          </nav>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <AnimatedSection>
            <div className="sticky top-28">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900/50 mb-4">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg">
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="absolute top-4 right-4 px-3 py-1.5 rounded-xl text-xs font-bold bg-red-500/90 text-white">
                    Save {discount}%
                  </span>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === i
                          ? 'border-cyan-400 shadow-lg shadow-cyan-500/20'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Product Info */}
          <AnimatedSection delay={0.15}>
            <div className="lg:sticky lg:top-28">
              <p className="text-xs text-cyan-400 uppercase tracking-wider font-semibold mb-2">
                {product.category}
              </p>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>

              <div className="mt-3 flex items-center gap-3">
                <StarRating rating={product.rating} count={product.reviewCount} size={16} />
              </div>

              <p className="mt-4 text-slate-400 leading-relaxed">{product.shortDescription}</p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-4xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-slate-500 line-through">${product.originalPrice}</span>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-red-500/10 text-red-400">
                      Save ${product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Color options */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium mb-3">Color</p>
                  <div className="flex gap-2">
                    {product.colors.map((color, i) => (
                      <button
                        key={color}
                        className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                          i === 0
                            ? 'bg-white/10 text-white border border-white/20'
                            : 'glass text-slate-400 hover:text-white hover:bg-white/[0.06]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-6">
                <p className="text-sm font-medium mb-3">Quantity</p>
                <div className="flex items-center gap-1 glass rounded-xl p-1 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart — full width */}
              <div className="mt-8">
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                >
                  {addedToCart ? (
                    <><Check size={18} /> Added!</>
                  ) : inCart ? (
                    <><ShoppingCart size={18} /> Add More ({inCart.quantity} in cart)</>
                  ) : (
                    <><ShoppingCart size={18} /> Add to Cart</>
                  )}
                </Button>
              </div>

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { icon: Truck, label: 'Free Shipping' },
                  { icon: Shield, label: '2-Year Warranty' },
                  { icon: RotateCcw, label: '30-Day Returns' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                    <Icon size={18} className="text-cyan-400" />
                    <span className="text-[11px] text-slate-400">{label}</span>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="mt-10">
                <div className="flex gap-1 p-1 glass rounded-xl">
                  {(['description', 'specs', 'reviews'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all capitalize ${
                        activeTab === tab
                          ? 'bg-white/10 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  {activeTab === 'description' && (
                    <div className="prose prose-invert text-sm text-slate-400 leading-relaxed">
                      <p>{product.description}</p>
                      {product.features.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {product.features.map(f => (
                            <li key={f} className="flex items-start gap-2">
                              <Check size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="space-y-0">
                      {product.specs.map(spec => (
                        <div
                          key={spec.label}
                          className="flex justify-between py-3 border-b border-white/5 last:border-0"
                        >
                          <span className="text-sm text-slate-500">{spec.label}</span>
                          <span className="text-sm font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="text-center py-8">
                      <div className="text-4xl font-bold mb-1">{product.rating}</div>
                      <StarRating rating={product.rating} size={18} />
                      <p className="mt-2 text-sm text-slate-400">
                        Based on {product.reviewCount} reviews
                      </p>
                      <div className="mt-6 space-y-3">
                        {[5, 4, 3, 2, 1].map(star => {
                          const pct = star === 5 ? 65 : star === 4 ? 22 : star === 3 ? 8 : star === 2 ? 3 : 2;
                          return (
                            <div key={star} className="flex items-center gap-3">
                              <span className="text-xs text-slate-500 w-8">{star}★</span>
                              <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="text-xs text-slate-500 w-8">{pct}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <AnimatedSection>
              <SectionHeading
                badge="You May Also Like"
                title="Related Products"
                center={false}
              />
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
