import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";

export const CTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[3.5rem] overflow-hidden bg-gradient-to-br from-orange-500 to-rose-600 p-12 md:p-24 text-center">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <Reveal width="100%">
              <h2 className="text-4xl md:text-7xl font-serif text-white mb-8">
                Ready to Start Your Journey?
              </h2>
            </Reveal>
            <Reveal width="100%" delay={0.3}>
              <p className="text-white/80 text-lg md:text-xl mb-12">
                Join us for an evening of culinary magic. Tables fill up
                quickly, so we recommend booking in advance.
              </p>
            </Reveal>
            <Reveal width="100%" delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/reservation"
                  className="px-10 py-5 bg-white text-orange-600 font-bold text-lg rounded-full hover:bg-orange-50 transition-all inline-flex items-center justify-center"
                >
                  Book a Table Now
                </Link>
                <Link
                  to="/events"
                  className="px-10 py-5 bg-black/20 text-white font-bold text-lg rounded-full backdrop-blur-md border border-white/20 hover:bg-black/30 transition-all inline-flex items-center justify-center"
                >
                  Gift a Dinner
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
