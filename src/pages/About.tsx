import { Award, Heart, Leaf, Users } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { Link } from 'react-router-dom';

const chefs = [
  {
    name: 'Marcus Aurelius',
    role: 'Executive Chef & Founder',
    bio: 'With over 20 years of Michelin-starred experience, Chef Marcus brings his passion for modern European cuisine to every plate.',
    image: '/interior.jpg',
  },
  {
    name: 'Sofia Chen',
    role: 'Pastry Chef',
    bio: 'A master of dessert artistry, Sofia trained in Paris and brings a delicate touch to every sweet creation.',
    image: '/dish-1.jpg',
  },
  {
    name: 'Antonio Rivera',
    role: 'Sommelier',
    bio: 'Antonio\'s expertise in wine pairing elevates every dining experience, with a cellar of over 500 selections.',
    image: '/hero-bg.jpg',
  },
];

const values = [
  { icon: <Leaf className="w-8 h-8 text-orange-400" />, title: 'Sustainable Sourcing', desc: 'We partner with local organic farms and sustainable suppliers.' },
  { icon: <Award className="w-8 h-8 text-rose-400" />, title: 'Culinary Excellence', desc: 'Michelin-standard preparation in every dish we serve.' },
  { icon: <Heart className="w-8 h-8 text-orange-400" />, title: 'Passion-Driven', desc: 'Every team member shares a love for the culinary arts.' },
  { icon: <Users className="w-8 h-8 text-rose-400" />, title: 'Guest First', desc: 'Your experience is at the heart of everything we do.' },
];

export default function About() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <PageHeader
          title="Our Story"
          subtitle="A journey of passion, flavor, and culinary excellence since 2015."
          image="/interior.jpg"
        />

        {/* Story Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="relative">
                  <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white/5">
                    <img src="/interior.jpg" alt="Restaurant Interior" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-3xl overflow-hidden border-8 border-[#050505] hidden md:block">
                    <img src="/hero-bg.jpg" alt="Dining" className="w-full h-full object-cover" />
                  </div>
                </div>
              </Reveal>
              <div className="space-y-6">
                <Reveal delay={0.3}>
                  <h2 className="text-4xl md:text-5xl font-serif">The <span className="text-accent-gradient italic">Epicurean</span> Philosophy</h2>
                </Reveal>
                <Reveal delay={0.4}>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Founded in 2015 by Chef Marcus Aurelius, Epicurean was born from a simple belief: dining is an art form.
                    What began as a small bistro with 12 seats has grown into the city's most celebrated fine dining destination.
                  </p>
                </Reveal>
                <Reveal delay={0.5}>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Our philosophy centers on three pillars: exceptional ingredients, masterful technique, and genuine hospitality.
                    We work directly with local farmers, fishermen, and artisans to source the finest seasonal produce,
                    ensuring every dish tells a story of place and passion.
                  </p>
                </Reveal>
                <Reveal delay={0.6}>
                  <div className="grid grid-cols-3 gap-6 pt-4">
                    <div>
                      <h4 className="text-3xl font-bold text-orange-400">9</h4>
                      <p className="text-white/50 text-sm uppercase tracking-widest">Years</p>
                    </div>
                    <div>
                      <h4 className="text-3xl font-bold text-rose-400">3</h4>
                      <p className="text-white/50 text-sm uppercase tracking-widest">Michelin Stars</p>
                    </div>
                    <div>
                      <h4 className="text-3xl font-bold text-orange-400">50k+</h4>
                      <p className="text-white/50 text-sm uppercase tracking-widest">Guests Served</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-serif mb-4">Our <span className="text-accent-gradient">Values</span></h2>
                <p className="text-white/60">The principles that guide every plate we serve.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="glass p-8 rounded-3xl h-full hover:bg-white/10 transition-all duration-500">
                    <div className="mb-6 p-3 rounded-2xl bg-white/5 w-fit">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-white/60 leading-relaxed">{value.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Chefs */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-serif mb-4">Meet the <span className="text-accent-gradient italic">Team</span></h2>
                <p className="text-white/60">The masterminds behind your culinary journey.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {chefs.map((chef, index) => (
                <Reveal key={index} delay={index * 0.15}>
                  <div className="group">
                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6">
                      <img
                        src={chef.image}
                        alt={chef.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-6 left-6">
                        <h4 className="text-2xl font-serif">{chef.name}</h4>
                        <p className="text-orange-400 text-sm font-medium">{chef.role}</p>
                      </div>
                    </div>
                    <p className="text-white/60 leading-relaxed">{chef.bio}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Experience It Yourself</h2>
              <p className="text-white/60 text-lg mb-8">Join us for an evening of culinary magic.</p>
              <Link to="/reservation" className="inline-flex items-center px-8 py-4 bg-orange-500 text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all">
                Reserve Your Table
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
