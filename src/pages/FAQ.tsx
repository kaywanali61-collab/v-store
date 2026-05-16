import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { AnimatedSection, SectionHeading } from '../components/UI';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: 'Orders & Shipping',
    question: 'How long does shipping take?',
    answer: 'Standard shipping within Iraq takes 2-5 business days. Express shipping is available for next-day delivery in Erbil and 1-2 days for other major cities. International shipping times vary by destination.',
  },
  {
    category: 'Orders & Shipping',
    question: 'Do you offer free shipping?',
    answer: 'Yes! We offer free standard shipping on all orders over $50. For orders under $50, a flat shipping fee of $5 applies. Express shipping options are available at checkout for an additional fee.',
  },
  {
    category: 'Orders & Shipping',
    question: 'How can I track my order?',
    answer: 'Once your order ships, you\'ll receive an email with a tracking number and link. You can also track your order by logging into your account and visiting the "Track Order" section.',
  },
  {
    category: 'Returns & Warranty',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day hassle-free return policy. If you\'re not satisfied with your purchase, you can return it within 30 days for a full refund. Items must be in their original packaging and condition.',
  },
  {
    category: 'Returns & Warranty',
    question: 'Do your products come with warranty?',
    answer: 'All V Store products come with a minimum 1-year manufacturer warranty. Many premium items include extended 2-year warranties. Check individual product pages for specific warranty details.',
  },
  {
    category: 'Returns & Warranty',
    question: 'How do I initiate a return?',
    answer: 'Simply contact our support team via email, live chat, or phone with your order number. We\'ll provide a return shipping label and process your refund within 3-5 business days of receiving the item.',
  },
  {
    category: 'Payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards (Visa, Mastercard), Zain Cash, Asia Hawala, bank transfers, and cash on delivery (COD) for orders within Iraq.',
  },
  {
    category: 'Payment',
    question: 'Is cash on delivery available?',
    answer: 'Yes! Cash on delivery is available for all orders within Iraq. There\'s no additional fee for COD orders. Simply select "Cash on Delivery" at checkout.',
  },
  {
    category: 'Products',
    question: 'Are your products original and authentic?',
    answer: 'Absolutely. We source all products directly from authorized distributors and manufacturers. Every product comes with original packaging, accessories, and valid warranty. We guarantee 100% authenticity.',
  },
  {
    category: 'Products',
    question: 'Do you offer product recommendations?',
    answer: 'Yes! Our tech experts are available via live chat to help you choose the perfect product for your needs. We can provide personalized recommendations based on your budget, use case, and preferences.',
  },
  {
    category: 'Account',
    question: 'Do I need an account to place an order?',
    answer: 'While you can check out as a guest, creating an account gives you access to order tracking, exclusive deals, and faster checkout. It\'s free and takes just 30 seconds.',
  },
];

const categories = ['All', ...Array.from(new Set(faqData.map(f => f.category)))];

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.03] transition-colors"
      >
        <span className="font-medium text-sm md:text-base pr-4">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={18} className="text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = faqData.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Support"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about V Store. Can't find an answer? Contact our support team."
          />
        </AnimatedSection>

        {/* Search */}
        <AnimatedSection delay={0.1}>
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/30 transition-colors"
            />
          </div>
        </AnimatedSection>

        {/* Category tabs */}
        <AnimatedSection delay={0.15}>
          <div className="flex gap-2 mb-8 overflow-x-auto hide-scrollbar pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                    : 'glass text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filtered.map((item, i) => (
            <AnimatedSection key={item.question} delay={i * 0.05}>
              <FAQAccordion item={item} />
            </AnimatedSection>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400">No questions match your search.</p>
              <p className="text-sm text-slate-500 mt-2">Try a different search term or category.</p>
            </div>
          )}
        </div>

        {/* Still need help */}
        <AnimatedSection delay={0.3}>
          <div className="mt-12 glass rounded-2xl p-8 text-center">
            <h3 className="text-lg font-bold mb-2">Still have questions?</h3>
            <p className="text-sm text-slate-400 mb-6">Our support team is ready to help you with anything.</p>
            <a
              href="/#/contact"
              className="inline-flex items-center gap-2 px-6 py-3 btn-gradient rounded-xl font-semibold text-sm text-white"
            >
              Contact Support
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
