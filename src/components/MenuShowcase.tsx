import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { TabScroller } from "./TabScroller";
import { menuItems, categories } from "../data/menu";

export const MenuShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? menuItems.slice(0, 6)
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-serif mb-4">
                The Culinary <br />
                <span className="text-accent-gradient">Masterpieces</span>
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-white/60 max-w-xl">
                Explore our curated selection of seasonal favorites, each
                designed to take you on a sensory journey.
              </p>
            </Reveal>
          </div>

          <TabScroller
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((dish) => (
              <motion.div
                key={dish.id}
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
                    <Link
                      to="/order"
                      className="w-full py-3 bg-white text-black font-bold rounded-xl translate-y-4 group-hover:translate-y-0 transition-transform text-center"
                    >
                      Order Now
                    </Link>
                  </div>
                  {dish.isSignature && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-orange-500 rounded-full text-xs font-bold">
                      Signature
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-serif mb-1">{dish.name}</h4>
                    <p className="text-white/50 text-sm">{dish.description}</p>
                  </div>
                  <span className="text-orange-400 font-bold text-xl">
                    ${dish.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-16">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full font-bold hover:bg-white/10 transition-all"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};
