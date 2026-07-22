import { Utensils, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="pt-24 pb-12 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center">
                <Utensils className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase">Epicurean</span>
            </a>
            <p className="text-white/50 leading-relaxed mb-6">
              Elevating the art of dining to new heights. Join us for an unforgettable culinary journey.
            </p>
            <div className="flex gap-4">
               {/* Placeholders for social icons */}
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer group">
                   <div className="w-4 h-4 bg-white/50 group-hover:bg-white" />
                 </div>
               ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Menu', 'Gallery', 'Private Events', 'Reservations'].map(item => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-orange-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/50">
                <MapPin size={18} className="text-orange-500" />
                <span>123 Culinary Ave, Foodie City, FC 90210</span>
              </li>
              <li className="flex items-center gap-3 text-white/50">
                <Phone size={18} className="text-orange-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-white/50">
                <Mail size={18} className="text-orange-500" />
                <span>hello@epicurean.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-white/50 text-sm mb-4">Subscribe for exclusive event invites and menu updates.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button className="absolute right-1 top-1 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs">
          <p>© 2024 Epicurean Restaurant Group. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
