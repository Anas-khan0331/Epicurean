import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { MenuShowcase } from '../components/MenuShowcase';
import { Experience } from '../components/Experience';
import { Testimonials } from '../components/Testimonials';
import { Pricing } from '../components/Pricing';
import { FAQ } from '../components/FAQ';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <Features />
        <MenuShowcase />
        <Experience />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
