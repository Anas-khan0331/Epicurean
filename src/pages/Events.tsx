import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Check, Loader2, PartyPopper, Briefcase, Heart, Cake } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';

const eventTypes = [
  { icon: <PartyPopper className="w-8 h-8 text-orange-400" />, title: 'Private Parties', desc: 'Birthday celebrations, anniversaries, and special gatherings.' },
  { icon: <Briefcase className="w-8 h-8 text-rose-400" />, title: 'Corporate Events', desc: 'Business dinners, team celebrations, and client entertainment.' },
  { icon: <Heart className="w-8 h-8 text-orange-400" />, title: 'Weddings', desc: 'Rehearsal dinners, wedding receptions, and engagement parties.' },
  { icon: <Cake className="w-8 h-8 text-rose-400" />, title: 'Custom Celebrations', desc: 'Holiday parties, milestone events, and everything in between.' },
];

const packages = [
  {
    name: 'Intimate Gathering',
    price: '$85',
    perPerson: true,
    features: ['Up to 20 guests', '3-course plated menu', 'Dedicated event coordinator', 'Standard beverage package', 'Floral centerpieces'],
  },
  {
    name: 'Grand Celebration',
    price: '$145',
    perPerson: true,
    features: ['Up to 80 guests', '5-course tasting menu', 'Premium wine pairing', 'Full event styling', 'Live music coordination', 'Valet parking'],
    isPopular: true,
  },
  {
    name: 'Exclusive Buyout',
    price: '$25,000',
    perPerson: false,
    features: ['Entire restaurant exclusive', 'Up to 150 guests', 'Custom 7-course menu', 'Open premium bar', 'Full decoration & lighting', 'Dedicated staff', 'Late-night menu'],
  },
];

interface EventForm {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  guests: number;
  budget: string;
  message: string;
}

export default function Events() {
  const [formData, setFormData] = useState<EventForm>({
    name: '',
    email: '',
    phone: '',
    eventType: 'Private Party',
    date: '',
    guests: 10,
    budget: '$5,000 - $10,000',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'guests' ? parseInt(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('success');
    }
  };

  return (
    <>
      <Navbar />
      <main className="relative">
        <PageHeader
          title="Private Events"
          subtitle="Make your special occasion truly unforgettable at Epicurean."
          image="/hero-bg.jpg"
        />

        {/* Event Types */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-serif mb-4">Every <span className="text-accent-gradient">Occasion</span></h2>
                <p className="text-white/60">From intimate gatherings to grand celebrations.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {eventTypes.map((type, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="glass p-8 rounded-3xl h-full hover:bg-white/10 transition-all">
                    <div className="mb-6 p-3 rounded-2xl bg-white/5 w-fit">{type.icon}</div>
                    <h3 className="text-xl font-bold mb-4">{type.title}</h3>
                    <p className="text-white/60 leading-relaxed">{type.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-serif mb-4">Event <span className="text-accent-gradient">Packages</span></h2>
                <p className="text-white/60">Tailored to make your event extraordinary.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className={`p-8 rounded-[2.5rem] flex flex-col h-full transition-all duration-500 hover:scale-[1.02] ${
                    pkg.isPopular ? 'bg-gradient-to-br from-orange-600/20 to-rose-600/20 border-2 border-orange-500/50' : 'glass border border-white/10'
                  }`}>
                    {pkg.isPopular && (
                      <span className="bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full w-fit mb-6">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                      {pkg.perPerson && <span className="text-white/40">/person</span>}
                    </div>
                    <div className="space-y-4 mb-10 flex-grow">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                            <Check size={12} className="text-orange-400" />
                          </div>
                          <span className="text-sm text-white/70">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-[3rem] p-12 md:p-20 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8">
                  <Check className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="text-4xl font-serif mb-4">Inquiry Received!</h2>
                <p className="text-white/70 text-lg mb-8">
                  Thank you, {formData.name}. Our events team will contact you within 24 hours to discuss your event.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <Reveal>
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-serif mb-4">Plan Your <span className="text-accent-gradient">Event</span></h2>
                  <p className="text-white/60">Tell us about your vision and we'll make it happen.</p>
                </div>
                <form onSubmit={handleSubmit} className="glass rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Full Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Email *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Phone *</label>
                      <input type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Event Type *</label>
                      <select name="eventType" value={formData.eventType} onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors appearance-none">
                        <option className="bg-[#0a0a0a]">Private Party</option>
                        <option className="bg-[#0a0a0a]">Corporate Event</option>
                        <option className="bg-[#0a0a0a]">Wedding</option>
                        <option className="bg-[#0a0a0a]">Birthday Celebration</option>
                        <option className="bg-[#0a0a0a]">Anniversary</option>
                        <option className="bg-[#0a0a0a]">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Preferred Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input type="date" name="date" required min={new Date().toISOString().split('T')[0]} value={formData.date} onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-orange-500 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Number of Guests *</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input type="number" name="guests" required min="1" max="200" value={formData.guests} onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-orange-500 transition-colors" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Estimated Budget</label>
                    <select name="budget" value={formData.budget} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors appearance-none">
                      <option className="bg-[#0a0a0a]">Under $5,000</option>
                      <option className="bg-[#0a0a0a]">$5,000 - $10,000</option>
                      <option className="bg-[#0a0a0a]">$10,000 - $25,000</option>
                      <option className="bg-[#0a0a0a]">$25,000 - $50,000</option>
                      <option className="bg-[#0a0a0a]">$50,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Tell us about your event</label>
                    <textarea name="message" rows={4} value={formData.message} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                      placeholder="Share your vision, special requests, or any details you'd like us to know." />
                  </div>
                  {status === 'error' && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}
                  <button type="submit" disabled={status === 'loading'}
                    className="w-full py-4 bg-orange-500 hover:bg-orange-600 rounded-2xl font-bold text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {status === 'loading' ? (<><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>) : 'Submit Inquiry'}
                  </button>
                </form>
              </Reveal>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
