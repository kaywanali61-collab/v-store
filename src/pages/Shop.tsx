import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Button, AnimatedSection, ProductCard } from '../components/UI';
import { products, categories, searchProducts } from '../data';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('q') || '';

  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const filtered = useMemo(() => {
    let result = searchQuery ? searchProducts(searchQuery) : [...products];

    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [category, sort, priceRange, searchQuery]);

  const clearFilters = () => {
    setCategory('all');
    setSort('featured');
    setPriceRange([0, 2000]);
  };

  const hasActiveFilters = category !== 'all' || sort !== 'featured' || priceRange[0] > 0 || priceRange[1] < 2000;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {searchQuery ? `Results for "${searchQuery}"` : category !== 'all' ? `${categories.find(c => c.id === category)?.name || 'Shop'}` : 'All Products'}
            </h1>
            <p className="mt-2 text-slate-400">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </AnimatedSection>

        {/* Toolbar */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
            <div className="flex flex-wrap items-center gap-3">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-medium hover:bg-white/[0.06] transition-colors"
              >
                <SlidersHorizontal size={16} />
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                )}
              </button>

              {/* Category pills */}
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                <button
                  onClick={() => setCategory('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    category === 'all'
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                      : 'glass text-slate-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      category === cat.id
                        ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                        : 'glass text-slate-400 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value as SortOption)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl glass text-sm text-slate-300 focus:outline-none focus:border-cyan-500/30 cursor-pointer bg-transparent"
                >
                  <option value="featured" className="bg-gray-900">Featured</option>
                  <option value="price-asc" className="bg-gray-900">Price: Low to High</option>
                  <option value="price-desc" className="bg-gray-900">Price: High to Low</option>
                  <option value="rating" className="bg-gray-900">Top Rated</option>
                  <option value="newest" className="bg-gray-900">Newest</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Desktop Filters + Grid */}
        <div className="flex gap-8">
          {/* Sidebar Filters (desktop) */}
          <AnimatePresence>
            {(showFilters || typeof window !== 'undefined') && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`${
                  showFilters ? 'fixed inset-0 z-50 bg-gray-950/90 p-6 pt-20 lg:relative lg:bg-transparent lg:p-0 lg:z-0' : 'hidden lg:block'
                } w-full lg:w-64 shrink-0`}
              >
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-sm">Filters</h3>
                    <div className="flex items-center gap-2">
                      {hasActiveFilters && (
                        <button onClick={clearFilters} className="text-xs text-cyan-400 hover:underline">
                          Clear all
                        </button>
                      )}
                      <button onClick={() => setShowFilters(false)} className="lg:hidden text-slate-400">
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">Price Range</h4>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0] || ''}
                        onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500/30"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1] || ''}
                        onChange={e => setPriceRange([priceRange[0], Number(e.target.value) || 2000])}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500/30"
                      />
                    </div>
                  </div>

                  {/* Quick price buttons */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Under $50', range: [0, 50] as [number, number] },
                      { label: '$50 - $150', range: [50, 150] as [number, number] },
                      { label: '$150 - $500', range: [150, 500] as [number, number] },
                      { label: '$500+', range: [500, 2000] as [number, number] },
                    ].map(opt => (
                      <button
                        key={opt.label}
                        onClick={() => setPriceRange(opt.range)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                          priceRange[0] === opt.range[0] && priceRange[1] === opt.range[1]
                            ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30'
                            : 'glass text-slate-400 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-slate-400 mb-6">Try adjusting your filters or search query.</p>
                <Button variant="secondary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
