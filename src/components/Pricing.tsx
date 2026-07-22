import { Check } from 'lucide-react';
import { Reveal } from './Reveal';

const plans = [
  {
    name: "Petite Tasting",
    price: "$95",
    description: "A perfect introduction to our seasonal flavors.",
    features: ["4-Course Signature Menu", "Welcoming Cocktail", "Hand-crafted Petit Fours", "Standard Seating"],
    isPopular: false
  },
  {
    name: "Grand Journey",
    price: "$165",
    description: "Our full culinary narrative in seven movements.",
    features: ["7-Course Seasonal Menu", "Sommelier Selection", "Chef's Greeting", "Preferred Seating", "Gift Box"],
    isPopular: true
  },
  {
    name: "Chef's Table",
    price: "$295",
    description: "The ultimate intimate dining experience.",
    features: ["12-Course Surprise Menu", "Vintage Wine Pairing", "Kitchen Interaction", "VIP Service", "Kitchen Tour"],
    isPopular: false
  }
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif mb-4">Curated <span className="text-accent-gradient">Journeys</span></h2>
            <p className="text-white/60">Choose the path that speaks to your palate.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className={`p-8 rounded-[2.5rem] flex flex-col h-full transition-all duration-500 hover:scale-[1.02] ${
                plan.isPopular ? 'bg-gradient-to-br from-orange-600/20 to-rose-600/20 border-2 border-orange-500/50' : 'glass border border-white/10'
              }`}>
                {plan.isPopular && (
                  <span className="bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full w-fit mb-6">
                    Most Immersive
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-white/50 text-sm mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-white/40">/person</span>
                </div>
                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                        <Check size={12} className="text-orange-400" />
                      </div>
                      <span className="text-sm text-white/70">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full py-4 rounded-2xl font-bold transition-all ${
                  plan.isPopular ? 'bg-white text-black hover:bg-orange-500 hover:text-white' : 'glass hover:bg-white/10'
                }`}>
                  Reserve Now
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
