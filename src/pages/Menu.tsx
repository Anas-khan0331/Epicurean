import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Flame, Wheat, ShoppingCart } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageHeader } from "../components/PageHeader";
import { menuItems, categories } from "../data/menu";
import { useCart } from "../context/CartContext";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main className="relative">
        <PageHeader
          title="Our Menu"
          subtitle="A curated selection of seasonal dishes, crafted with the finest ingredients."
          image="/interior.jpg"
        />

        <section className="py-24 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6">
            {/* Search */}
            <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-96 bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-orange-500 text-white"
                        : "glass text-white/70 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredItems.length === 0 ? (
                  <div className="col-span-full text-center py-20">
                    <p className="text-white/50 text-xl">
                      No dishes found. Try a different search.
                    </p>
                  </div>
                ) : (
                  filteredItems.map((dish) => (
                    <div
                      key={dish.id}
                      className="glass rounded-3xl overflow-hidden group hover:bg-white/10 transition-all duration-500"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {dish.isSignature && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-orange-500 rounded-full text-xs font-bold">
                            Signature
                          </div>
                        )}
                        <div className="absolute top-4 right-4 flex gap-2">
                          {dish.isVegetarian && (
                            <div
                              className="w-8 h-8 rounded-full bg-green-500/80 flex items-center justify-center"
                              title="Vegetarian"
                            >
                              <Leaf className="w-4 h-4 text-white" />
                            </div>
                          )}
                          {dish.isVegan && (
                            <div
                              className="w-8 h-8 rounded-full bg-green-600/80 flex items-center justify-center"
                              title="Vegan"
                            >
                              <Leaf className="w-4 h-4 text-white" />
                            </div>
                          )}
                          {dish.isGlutenFree && (
                            <div
                              className="w-8 h-8 rounded-full bg-blue-500/80 flex items-center justify-center"
                              title="Gluten Free"
                            >
                              <Wheat className="w-4 h-4 text-white" />
                            </div>
                          )}
                          {dish.isSpicy && (
                            <div
                              className="w-8 h-8 rounded-full bg-red-500/80 flex items-center justify-center"
                              title="Spicy"
                            >
                              <Flame className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-xl font-serif">{dish.name}</h4>
                          <span className="text-orange-400 font-bold text-lg">
                            ${dish.price}
                          </span>
                        </div>
                        <p className="text-white/50 text-sm mb-4">
                          {dish.description}
                        </p>
                        <div className="flex gap-2 mb-4 flex-wrap">
                          {dish.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => addToCart(dish)}
                          className="w-full py-3 bg-white/5 hover:bg-orange-500 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Order
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
