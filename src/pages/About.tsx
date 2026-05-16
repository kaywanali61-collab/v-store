import { AnimatedSection, SectionHeading } from '../components/UI';
import { Globe, Zap, Users, Award, Target, ThumbsUp } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We push boundaries to bring the latest technology to our customers before anyone else.',
    },
    {
      icon: ThumbsUp,
      title: 'Customer Obsessed',
      description: 'Every decision we make starts with our customers. Your satisfaction is our metric for success.',
    },
    {
      icon: Award,
      title: 'Quality Guaranteed',
      description: 'We hand-pick every product in our catalog. If it doesn\'t meet our standards, it doesn\'t make the cut.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by tech enthusiasts, for tech enthusiasts. We understand your passion because we share it.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting global tech innovation with local markets. Premium technology, accessible to everyone.',
    },
    {
      icon: Target,
      title: 'Purposeful Design',
      description: 'We believe great technology should be beautifully designed. Form and function in perfect harmony.',
    },
  ];

  const milestones = [
    { year: '2024', title: 'Founded', description: 'V Store was born in Erbil with a vision to bring premium tech to Iraq.' },
    { year: '2024', title: 'First 1000 Customers', description: 'Rapidly grew our community of tech enthusiasts through word of mouth.' },
    { year: '2025', title: 'Product Expansion', description: 'Expanded to 200+ products across gaming, mobile, wearables, and accessories.' },
    { year: '2025', title: 'Regional Growth', description: 'Extended shipping across the Kurdistan Region and broader Iraq.' },
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-violet-400/10 text-violet-400 border border-violet-400/20 mb-6">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Building the Future of
              <br />
              <span className="neon-text">Tech Retail</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              V Store is more than an e-commerce brand. We're a movement to make
              premium technology accessible, stylish, and enjoyable for everyone.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 mb-4">
                Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Next-Generation Tech, Delivered with <span className="neon-text">Style</span>
              </h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  We started V Store in 2024 with a clear mission: bridge the gap between
                  global tech innovation and local accessibility in Iraq and the broader region.
                </p>
                <p>
                  Too often, the best technology was either unavailable or overpriced in our market.
                  We set out to change that by building a brand that offers world-class products
                  at fair prices, backed by exceptional service.
                </p>
                <p>
                  Today, we serve thousands of tech enthusiasts, gamers, and digital professionals —
                  and we're just getting started.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '50K+', label: 'Customers Served' },
                  { value: '200+', label: 'Premium Products' },
                  { value: '4.9', label: 'Average Rating' },
                  { value: '99%', label: 'Satisfaction Rate' },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold neon-text mb-1">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              badge="Values"
              title="What We Stand For"
              subtitle="The principles that guide every decision we make."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.08}>
                <div className="glass rounded-2xl p-6 h-full hover:bg-white/[0.06] transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:from-cyan-500/20 group-hover:to-violet-500/20 transition-colors">
                    <value.icon size={20} className="text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              badge="Journey"
              title="Our Story So Far"
              subtitle="Key milestones in the V Store journey."
            />
          </AnimatedSection>

          <div className="max-w-2xl mx-auto">
            {milestones.map((m, i) => (
              <AnimatedSection key={m.year + m.title} delay={i * 0.1}>
                <div className="flex gap-6 pb-8 last:pb-0 relative">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-xs font-bold shrink-0 shadow-lg shadow-cyan-500/20">
                      {m.year}
                    </div>
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-cyan-500/30 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="pt-2 pb-4">
                    <h3 className="text-lg font-semibold mb-1">{m.title}</h3>
                    <p className="text-sm text-slate-400">{m.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl glass p-12 md:p-16 text-center">
              <div className="absolute inset-0 mesh-gradient opacity-30" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Experience <span className="neon-text">V Store</span>?
                </h2>
                <p className="text-slate-400 max-w-lg mx-auto mb-8">
                  Join thousands of satisfied customers who've made V Store their go-to destination for premium tech.
                </p>
                <a
                  href="/#/shop"
                  className="inline-flex items-center gap-2 px-8 py-4 btn-gradient rounded-xl font-semibold text-white"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
