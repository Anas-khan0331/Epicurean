import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Wine List'];

const dishes = [
  {
    name: "Truffle Ribeye",
    price: "$58",
    description: "28-day aged beef, black truffle jus, fondant potatoes.",
    image: "/dish-1.jpg",
    category: "Main Course"
  },
  {
    name: "Lobster Ravioli",
    price: "$42",
    description: "Handmade pasta, saffron butter, citrus zest.",
    image: "/hero-bg.jpg",
    category: "Starters"
  },
  {
    name: "Golden Soufflé",
    price: "$24",
    description: "24k gold leaf, dark chocolate, raspberry coulis.",
    image: "/interior.jpg",
    category: "Desserts"
  }
];

export const MenuShowcase = () => {
  return (
    <section id="menu" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-serif mb-4">The Culinary <br /><span className="text-accent-gradient">Masterpieces</span></h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-white/60 max-w-xl">
                Explore our curated selection of seasonal favorites, each designed to take you on a sensory journey.
              </p>
            </Reveal>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((cat, i) => (
              <button 
                key={cat}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  i === 0 ? 'bg-orange-500 text-white' : 'glass text-white/70 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6">
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <button className="w-full py-3 bg-white text-black font-bold rounded-xl translate-y-4 group-hover:translate-y-0 transition-transform">
                    Order Now
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-2xl font-serif mb-1">{dish.name}</h4>
                  <p className="text-white/50 text-sm">{dish.description}</p>
                </div>
                <span className="text-orange-400 font-bold text-xl">{dish.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
