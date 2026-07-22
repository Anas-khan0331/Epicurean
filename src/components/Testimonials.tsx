import { Quote, Star } from 'lucide-react';
import { Reveal } from './Reveal';

const reviews = [
  {
    name: "Alexander Rossi",
    role: "Food Critic",
    content: "The balance of flavors is simply unparalleled. Each course tells a story of tradition meeting innovation.",
    rating: 5
  },
  {
    name: "Elena Vance",
    role: "Lifestyle Blogger",
    content: "More than just a meal, it's an immersive experience. The atmosphere and service are as exquisite as the food.",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    role: "Executive Chef",
    content: "Rarely do I encounter such technical precision combined with genuine soul. Epicurean is a masterpiece.",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif mb-4">Voices of <span className="text-accent-gradient italic">Excellence</span></h2>
            <p className="text-white/60">What our guests have to say about their Epicurean journey.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Reveal key={index} delay={index * 0.2}>
              <div className="glass p-10 rounded-[2.5rem] relative">
                <Quote className="absolute top-6 right-8 text-white/10 w-16 h-16" />
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fb923c" className="text-orange-400" />
                  ))}
                </div>
                <p className="text-xl italic mb-8 leading-relaxed text-white/90">"{review.content}"</p>
                <div>
                  <h5 className="font-bold text-lg">{review.name}</h5>
                  <p className="text-white/50 text-sm">{review.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
