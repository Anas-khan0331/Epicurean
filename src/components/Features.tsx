import { Award, Clock, Leaf, Shield } from 'lucide-react';
import { Reveal } from './Reveal';

const features = [
  {
    icon: <Leaf className="w-8 h-8 text-orange-400" />,
    title: "Organic Sourcing",
    description: "We partner exclusively with local farmers who practice sustainable and organic agriculture."
  },
  {
    icon: <Award className="w-8 h-8 text-rose-400" />,
    title: "Michelin Standards",
    description: "Every dish is prepared to the highest culinary standards by our world-class chef team."
  },
  {
    icon: <Clock className="w-8 h-8 text-orange-400" />,
    title: "Timely Service",
    description: "Our staff is trained to provide a seamless dining experience without the rush."
  },
  {
    icon: <Shield className="w-8 h-8 text-rose-400" />,
    title: "Quality First",
    description: "Rigorous quality checks at every step from procurement to your final plate."
  }
];

export const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="glass p-8 rounded-3xl h-full group hover:bg-white/10 transition-all duration-500">
                <div className="mb-6 p-3 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
