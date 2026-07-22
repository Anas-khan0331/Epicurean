import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageHeader } from "../components/PageHeader";
import { TabScroller } from "../components/TabScroller";

const galleryItems = [
  { image: "/hero-bg.jpg", title: "Signature Plating", category: "Dishes" },
  { image: "/interior.jpg", title: "Main Dining Hall", category: "Interior" },
  { image: "/dish-1.jpg", title: "Truffle Ribeye", category: "Dishes" },
  { image: "/hero-bg.jpg", title: "Chef in Action", category: "Kitchen" },
  { image: "/interior.jpg", title: "Private Booth", category: "Interior" },
  { image: "/dish-1.jpg", title: "Golden Soufflé", category: "Dishes" },
  { image: "/hero-bg.jpg", title: "Wine Selection", category: "Drinks" },
  { image: "/interior.jpg", title: "Rooftop Terrace", category: "Interior" },
  { image: "/dish-1.jpg", title: "Lobster Ravioli", category: "Dishes" },
  { image: "/hero-bg.jpg", title: "Cocktail Bar", category: "Drinks" },
  { image: "/interior.jpg", title: "Entrance", category: "Interior" },
  { image: "/dish-1.jpg", title: "Artisanal Cheese Board", category: "Dishes" },
];

const categories = ["All", "Dishes", "Interior", "Kitchen", "Drinks"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };
  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredItems.length) % filteredItems.length,
      );
    }
  };

  return (
    <>
      <Navbar />
      <main className="relative">
        <PageHeader
          title="Gallery"
          subtitle="A visual journey through Epicurean's world of culinary artistry."
          image="/dish-1.jpg"
        />

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-center mb-12">
              <TabScroller
                categories={categories}
                activeCategory={activeCategory}
                onSelect={setActiveCategory}
              />
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.title + index}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => openLightbox(index)}
                    className="group cursor-pointer relative aspect-square rounded-2xl overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h4 className="text-lg font-serif">{item.title}</h4>
                      <p className="text-orange-400 text-xs uppercase tracking-widest">
                        {item.category}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
            >
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-6 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                onClick={(e) => e.stopPropagation()}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-6 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                <h4 className="text-xl font-serif">
                  {filteredItems[lightboxIndex].title}
                </h4>
                <p className="text-orange-400 text-sm">
                  {filteredItems[lightboxIndex].category}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
