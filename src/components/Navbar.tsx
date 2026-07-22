import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Menu, X, Mail, Phone, MapPin } from 'lucide-react';
import { cn } from '../utils/cn';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Menu', href: '#menu' },
  { name: 'Experience', href: '#experience' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'py-3' : 'py-6'
      )}
    >
      <div className={cn(
        'max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-6 py-3 flex items-center justify-between',
        isScrolled ? 'glass-dark' : 'bg-transparent'
      )}>
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Utensils className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">EPICUREAN</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="px-5 py-2 rounded-full text-sm font-semibold glass hover:bg-white/10 transition-all">
            Login
          </button>
          <button className="px-5 py-2 rounded-full text-sm font-semibold bg-white text-black hover:bg-orange-500 hover:text-white transition-all">
            Book a Table
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden bg-black/95 backdrop-blur-xl flex flex-col pt-24 px-8"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-serif text-white hover:text-orange-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="mt-auto mb-12 flex flex-col gap-6">
              <button className="w-full py-4 rounded-2xl bg-white text-black font-bold text-lg">
                Book a Table
              </button>
              <div className="flex gap-6 justify-center">
                <Mail className="text-white/50" />
                <Phone className="text-white/50" />
                <MapPin className="text-white/50" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
