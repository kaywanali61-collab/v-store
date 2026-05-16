import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AnimatedSection, SectionHeading } from '../components/UI';
import { categories, getProductsByCategory } from '../data';

export default function Categories() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Browse"
            title="Shop by Category"
            subtitle="Find exactly what you need. From gaming peripherals to smart wearables, we've got you covered."
          />
        </AnimatedSection>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => {
            const catProducts = getProductsByCategory(cat.id);
            return (
              <AnimatedSection key={cat.id} delay={i * 0.1}>
                <Link
                  to={`/shop?category=${cat.id}`}
                  className="group relative block rounded-2xl overflow-hidden"
                >
                  {/* Background image */}
                  <div className="aspect-[16/9] relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-gray-950/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-cyan-400 uppercase tracking-wider font-semibold mb-1">
                          {cat.productCount} Products
                        </p>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">{cat.name}</h3>
                        <p className="text-sm text-slate-400 max-w-md">{cat.description}</p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shrink-0 ml-4 shadow-lg shadow-cyan-500/20"
                      >
                        <ArrowRight size={20} />
                      </motion.div>
                    </div>

                    {/* Product preview */}
                    <div className="mt-4 flex gap-2 overflow-hidden">
                      {catProducts.slice(0, 4).map(p => (
                        <div
                          key={p.id}
                          className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0"
                        >
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {catProducts.length > 4 && (
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-slate-400 shrink-0">
                          +{catProducts.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        {/* All categories CTA */}
        <AnimatedSection delay={0.4}>
          <div className="mt-12 text-center">
            <div className="glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-3">Can't decide?</h3>
              <p className="text-sm text-slate-400 mb-6">
                Browse our entire collection and discover products you didn't know you needed.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 btn-gradient rounded-xl font-semibold text-sm text-white"
              >
                View All Products <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
