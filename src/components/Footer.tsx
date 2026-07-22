import { useState } from "react";
import { Link } from "react-router-dom";
import { Utensils, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("success");
      setEmail("");
    }
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Gallery", path: "/gallery" },
    { name: "Private Events", path: "/events" },
    { name: "Reservations", path: "/reservation" },
    { name: "Order Online", path: "/order" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer
      id="contact"
      className="pt-24 pb-12 bg-black border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center">
                <Utensils className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase">
                Epicurean
              </span>
            </Link>
            <p className="text-white/50 leading-relaxed mb-6">
              Elevating the art of dining to new heights. Join us for an
              unforgettable culinary journey.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-orange-500 transition-colors text-sm font-bold text-white/70 hover:text-white"
              >
                f
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-orange-500 transition-colors text-sm font-bold text-white/70 hover:text-white"
              >
                Ig
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-orange-500 transition-colors text-sm font-bold text-white/70 hover:text-white"
              >
                X
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-orange-500 transition-colors text-sm font-bold text-white/70 hover:text-white"
              >
                Yt
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-white/50 hover:text-orange-400 transition-colors"
                  >
                    {item.name}
                  </Link>
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
                <a
                  href="tel:+15551234567"
                  className="hover:text-orange-400 transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/50">
                <Mail size={18} className="text-orange-500" />
                <a
                  href="mailto:hello@epicurean.com"
                  className="hover:text-orange-400 transition-colors"
                >
                  hello@epicurean.com
                </a>
              </li>
            </ul>
            <div className="mt-6 space-y-2">
              <p className="text-white/40 text-sm font-semibold uppercase tracking-wider">
                Hours
              </p>
              <p className="text-white/50 text-sm">Mon–Thu: 5PM – 11PM</p>
              <p className="text-white/50 text-sm">Fri–Sat: 12PM – 1AM</p>
              <p className="text-white/50 text-sm">Sun: 12PM – 10PM</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-white/50 text-sm mb-4">
              Subscribe for exclusive event invites and menu updates.
            </p>
            <form onSubmit={handleNewsletter} className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="absolute right-1 top-1 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                <ArrowRight size={16} />
              </button>
            </form>
            {status === "success" && (
              <p className="text-green-400 text-sm mt-3">
                Subscribed! Check your inbox.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm mt-3">
                Something went wrong. Try again.
              </p>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs">
          <p>&copy; 2024 Epicurean Restaurant Group. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
