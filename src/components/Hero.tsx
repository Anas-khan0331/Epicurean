import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Fine Dining"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#050505]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-black bg-orange-500 flex items-center justify-center text-[10px] font-bold"
              >
                <Star size={10} fill="currentColor" />
              </div>
            ))}
          </div>
          <span className="text-sm font-medium text-white/90">
            Rated #1 Dining Experience in the City
          </span>
        </motion.div>

        <Reveal width="100%">
          <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-[1.1]">
            Artistry in <br />
            <span className="text-accent-gradient italic">Every Bite</span>
          </h1>
        </Reveal>

        <Reveal width="100%" delay={0.4}>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
            Experience a symphony of flavors crafted with passion and precision.
            Where modern culinary techniques meet the finest seasonal
            ingredients.
          </p>
        </Reveal>

        <Reveal width="100%" delay={0.6}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/reservation"
              className="group relative px-8 py-4 bg-orange-500 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:pr-12 inline-flex items-center"
            >
              <span className="relative z-10">Reserve Your Table</span>
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </Link>
            <Link
              to="/menu"
              className="px-8 py-4 glass text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all inline-flex items-center"
            >
              Explore Our Menu
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[10%] hidden lg:block"
      >
        <div className="glass p-4 rounded-2xl w-48 rotate-6">
          <div className="w-full h-32 rounded-xl bg-gray-800 mb-3 overflow-hidden">
            <img
              src="/dish-1.jpg"
              alt="Dish"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs font-bold text-orange-400">SIGNATURE DISH</p>
          <p className="text-sm font-medium">Wagyu Gold Truffle</p>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
};
