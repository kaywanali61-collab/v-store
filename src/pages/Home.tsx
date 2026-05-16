import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Truck, ChevronRight } from 'lucide-react';
import { Button, SectionHeading, AnimatedSection, ProductCard, CountdownTimer, StarRating } from '../components/UI';
import { getFeaturedProducts, getTrendingProducts, getDealProducts, categories, testimonials } from '../data';
import { Link } from 'react-router-dom';

/* ============================================================
   HERO SECTION
   ============================================================ */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 grid-bg" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <Sparkles size={14} className="text-cyan-400" />
          <span className="text-xs font-medium text-slate-300">Introducing V Store — Next-Gen Tech</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
        >
          The Future of
          <br />
          <span className="neon-text">Tech Is Here</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Next-generation electronics & gaming gear, delivered with style.
          Experience premium tech crafted for the modern digital lifestyle.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="gradient" size="lg" to="/shop">
            Shop Now <ArrowRight size={18} />
          </Button>
          <Button variant="outline" size="lg" to="/categories">
            Explore Categories
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-6 sm:gap-10"
        >
          {[
            { icon: Truck, label: 'Free Shipping' },
            { icon: Shield, label: '2-Year Warranty' },
            { icon: Zap, label: 'Fast Delivery' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-slate-500">
              <Icon size={16} className="text-cyan-400/60" />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2.5 rounded-full bg-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   BRAND STORY SECTION
   ============================================================ */
function BrandStory() {
  const stats = [
    { value: '50K+', label: 'Happy Customers' },
    { value: '200+', label: 'Products' },
    { value: '24/7', label: 'Support' },
    { value: '4.9★', label: 'Avg Rating' },
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <AnimatedSection>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative">
                {/* Decorative circles */}
                <div className="absolute inset-0 rounded-3xl border border-cyan-500/10 rotate-6 scale-95" />
                <div className="absolute inset-0 rounded-3xl border border-violet-500/10 -rotate-3 scale-90" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 to-violet-500/5" />

                {/* Center content */}
                <div className="absolute inset-8 rounded-2xl glass flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-3xl font-bold mb-6 shadow-2xl shadow-cyan-500/20">
                    V
                  </div>
                  <h3 className="text-2xl font-bold mb-2">V Store</h3>
                  <p className="text-sm text-slate-400">Next-gen tech since 2024</p>
                  <div className="mt-6 w-full grid grid-cols-2 gap-3">
                    {stats.slice(0, 4).map(stat => (
                      <div key={stat.label} className="p-3 rounded-xl bg-white/5">
                        <div className="text-lg font-bold neon-text">{stat.value}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={0.2}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-violet-400/10 text-violet-400 border border-violet-400/20 mb-4">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Why <span className="neon-text">V Store</span> Exists
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                We started V Store with a simple belief: everyone deserves access to premium technology
                that enhances their digital lifestyle. Based in Iraq, we're bridging the gap between
                global tech innovation and local accessibility.
              </p>
              <p>
                Every product in our collection is hand-selected for quality, performance, and design.
                We don't just sell tech — we curate experiences. From gaming peripherals that give you
                the competitive edge to smart devices that simplify your daily routine.
              </p>
              <p>
                Our mission is to deliver next-generation technology with the style and service
                you deserve. Because great tech should be an experience, not just a transaction.
              </p>
            </div>
            <div className="mt-8">
              <Button variant="secondary" to="/about">
                Learn More <ChevronRight size={16} />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FEATURED PRODUCTS
   ============================================================ */
function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Featured"
            title="Handpicked for You"
            subtitle="Our curated selection of the finest tech, chosen for exceptional quality and design."
          />
        </AnimatedSection>

        {/* Horizontal scroll */}
        <div className="mt-4 -mx-4 px-4 overflow-x-auto hide-scrollbar">
          <div className="flex gap-5 pb-4" style={{ minWidth: 'min-content' }}>
            {featured.map((product) => (
              <div key={product.id} className="w-72 shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" to="/shop">
            View All Products <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CATEGORIES SHOWCASE
   ============================================================ */
function CategoriesShowcase() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Categories"
            title="Find Your Perfect Tech"
            subtitle="Explore our curated categories designed for every tech lifestyle."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.id} delay={i * 0.1}>
              <Link
                to={`/shop?category=${cat.id}`}
                className="group relative block rounded-2xl overflow-hidden aspect-[4/5]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />

                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-1">{cat.name}</h3>
                  <p className="text-sm text-slate-400 line-clamp-2">{cat.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-cyan-400 font-medium group-hover:gap-3 transition-all">
                    {cat.productCount} Products <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TRENDING SECTION
   ============================================================ */
function TrendingSection() {
  const trending = getTrendingProducts();

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Trending"
            title="What's Hot Right Now"
            subtitle="The most popular products our customers can't stop buying."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {trending.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FLASH DEALS SECTION
   ============================================================ */
function FlashDeals() {
  const deals = getDealProducts();
  const dealEnd = new Date();
  dealEnd.setDate(dealEnd.getDate() + 2);
  dealEnd.setHours(23, 59, 59);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <AnimatedSection>
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-red-500/10 text-red-400 border border-red-400/20 mb-4">
                🔥 Flash Sale
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Limited Time <span className="neon-text">Deals</span>
              </h2>
              <p className="mt-3 text-slate-400 max-w-lg">
                Incredible prices on premium tech. These deals won't last — grab yours before they're gone.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col items-start md:items-end gap-2">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Ends in</p>
              <CountdownTimer targetDate={dealEnd} />
            </div>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {deals.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Testimonials"
            title="Loved by Tech Enthusiasts"
            subtitle="Don't just take our word for it — hear from our community."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.slice(0, 6).map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 0.1}>
              <div className="h-full glass rounded-2xl p-6 hover:bg-white/[0.06] transition-colors">
                <StarRating rating={t.rating} />
                <p className="mt-4 text-sm text-slate-300 leading-relaxed">"{t.text}"</p>
                <div className="mt-5 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                    <p className="text-[10px] text-cyan-400/60 bg-cyan-400/5 px-2.5 py-1 rounded-lg">
                      {t.product}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HOME PAGE
   ============================================================ */
export default function Home() {
  return (
    <>
      <Hero />
      <BrandStory />
      <FeaturedProducts />
      <CategoriesShowcase />
      <TrendingSection />
      <FlashDeals />
      <Testimonials />
    </>
  );
}
