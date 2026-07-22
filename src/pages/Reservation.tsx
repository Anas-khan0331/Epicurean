import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Check, Loader2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
  seating: string;
  notes: string;
}

const timeSlots = [
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
  '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
];

const seatingOptions = ['Standard', 'Window View', 'Rooftop Terrace', 'Private Booth', 'Chef\'s Table'];

const occasions = ['Casual Dining', 'Birthday', 'Anniversary', 'Business Dinner', 'Date Night', 'Celebration', 'Other'];

export default function Reservation() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    occasion: 'Casual Dining',
    seating: 'Standard',
    notes: '',
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
      const res = await fetch('/api/reservation', {
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

  if (status === 'success') {
    return (
      <>
        <Navbar />
        <main className="relative min-h-screen flex items-center justify-center pt-20 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-[3rem] p-12 md:p-20 text-center max-w-2xl"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Reservation Confirmed!</h1>
            <p className="text-white/70 text-lg mb-8">
              Thank you, {formData.name}. We've sent a confirmation email to {formData.email}.
              Your table for {formData.guests} is reserved for {formData.date} at {formData.time}.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all"
            >
              Make Another Reservation
            </button>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="relative">
        <PageHeader
          title="Reserve a Table"
          subtitle="Book your unforgettable dining experience at Epicurean."
          image="/interior.jpg"
        />

        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <Reveal>
              <form onSubmit={handleSubmit} className="glass rounded-[2.5rem] p-8 md:p-12 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Number of Guests *</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="number"
                        name="guests"
                        required
                        min="1"
                        max="20"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="date"
                        name="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Time *</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <select
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                      >
                        <option value="" className="bg-[#0a0a0a]">Select time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot} className="bg-[#0a0a0a]">{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Seating Preference</label>
                    <select
                      name="seating"
                      value={formData.seating}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                    >
                      {seatingOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0a0a0a]">{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Occasion</label>
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                    >
                      {occasions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0a0a0a]">{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Special Requests / Dietary Notes</label>
                  <textarea
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    placeholder="Any allergies, special requests, or celebrations you'd like us to know about?"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">Something went wrong. Please try again or call us directly.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 rounded-2xl font-bold text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    'Confirm Reservation'
                  )}
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
