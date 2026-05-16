import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, MessageSquare, Clock } from 'lucide-react';
import { AnimatedSection, SectionHeading, Button } from '../components/UI';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactInfo = [
    { icon: MapPin, label: 'Visit Us', value: 'Erbil, Kurdistan Region, Iraq', sublabel: '100m Street, Empire Business Tower' },
    { icon: Phone, label: 'Call Us', value: '+964 750 000 0000', sublabel: 'Mon-Sat, 9am-8pm' },
    { icon: Mail, label: 'Email Us', value: 'hello@vstore.com', sublabel: 'We reply within 24 hours' },
    { icon: MessageSquare, label: 'Live Chat', value: 'Available 24/7', sublabel: 'Average response: 2 minutes' },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection>
          <SectionHeading
            badge="Contact"
            title="Get in Touch"
            subtitle="Have a question, suggestion, or just want to say hello? We'd love to hear from you."
          />
        </AnimatedSection>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactInfo.map((info, i) => (
            <AnimatedSection key={info.label} delay={i * 0.1}>
              <div className="glass rounded-2xl p-6 text-center hover:bg-white/[0.06] transition-colors h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  <info.icon size={20} className="text-cyan-400" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{info.label}</h3>
                <p className="text-sm text-white font-medium">{info.value}</p>
                <p className="text-xs text-slate-500 mt-1">{info.sublabel}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <AnimatedSection>
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Send a Message</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mx-auto mb-4">
                    <Send size={24} />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Message Sent!</h4>
                  <p className="text-sm text-slate-400">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs text-slate-400 font-medium mb-1.5 block">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-medium mb-1.5 block">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-medium mb-1.5 block">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-medium mb-1.5 block">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all resize-none"
                    />
                  </div>
                  <Button variant="gradient" size="lg" className="w-full">
                    <Send size={16} /> Send Message
                  </Button>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* Info Side */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              {/* Map placeholder */}
              <div className="glass rounded-2xl overflow-hidden aspect-video relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={40} className="text-cyan-400 mx-auto mb-3" />
                    <p className="text-sm font-medium">Erbil, Kurdistan Region</p>
                    <p className="text-xs text-slate-500 mt-1">100m Street, Empire Business Tower</p>
                  </div>
                </div>
                {/* Grid overlay for effect */}
                <div className="absolute inset-0 grid-bg opacity-50" />
              </div>

              {/* Business hours */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={18} className="text-cyan-400" />
                  <h3 className="font-semibold">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { day: 'Monday - Friday', hours: '9:00 AM - 8:00 PM' },
                    { day: 'Saturday', hours: '10:00 AM - 6:00 PM' },
                    { day: 'Sunday', hours: 'Closed' },
                  ].map(row => (
                    <div key={row.day} className="flex justify-between">
                      <span className="text-slate-400">{row.day}</span>
                      <span className={row.hours === 'Closed' ? 'text-red-400' : 'text-white'}>{row.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
