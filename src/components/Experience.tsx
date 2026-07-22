import { Reveal } from './Reveal';

export const Experience = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white/5">
                <img src="/interior.jpg" alt="Interior" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-3xl overflow-hidden border-8 border-[#050505] hidden md:block">
                <img src="/hero-bg.jpg" alt="Dining" className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.3}>
              <h2 className="text-4xl md:text-6xl font-serif">Immerse Yourself in <br /><span className="text-accent-gradient italic">Refined Elegance</span></h2>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-white/60 text-lg leading-relaxed">
                Beyond the plate, Epicurean offers an atmosphere meticulously designed for the sophisticated diner. From the warm ambient lighting to the curated soundscapes, every detail is engineered to heighten your senses.
              </p>
            </Reveal>
            
            <div className="grid grid-cols-2 gap-8 pt-4">
              <Reveal delay={0.5}>
                <div>
                  <h4 className="text-3xl font-bold text-orange-400 mb-2">12k+</h4>
                  <p className="text-white/50 text-sm uppercase tracking-widest">Happy Guests</p>
                </div>
              </Reveal>
              <Reveal delay={0.6}>
                <div>
                  <h4 className="text-3xl font-bold text-rose-400 mb-2">4.9/5</h4>
                  <p className="text-white/50 text-sm uppercase tracking-widest">Average Rating</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.7}>
              <button className="px-8 py-4 glass text-white rounded-full font-bold hover:bg-white/10 transition-all">
                Virtual Tour
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
