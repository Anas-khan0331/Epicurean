import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Reveal } from './Reveal';

const faqs = [
  {
    question: "Is there a dress code?",
    answer: "We recommend smart casual or formal attire to complement the refined atmosphere of our restaurant."
  },
  {
    question: "Do you cater to dietary restrictions?",
    answer: "Absolutely. Our chefs are trained to handle various dietary needs including vegan, gluten-free, and nut allergies. Please inform us when making your reservation."
  },
  {
    question: "Is valet parking available?",
    answer: "Yes, we offer complimentary valet parking for all our dinner guests."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We require at least 24 hours notice for cancellations. Late cancellations may incur a fee of $25 per person."
  }
];

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Common Questions</h2>
            <p className="text-white/60">Everything you need to know before your visit.</p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Reveal key={index} width="100%" delay={index * 0.1}>
              <div className="glass rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <span className="font-bold">{faq.question}</span>
                  {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-white/60 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
