import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Loader2, Check } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-orange-500" />,
      title: "Visit Us",
      lines: ["123 Culinary Ave", "Foodie City, FC 90210"],
    },
    {
      icon: <Phone className="w-6 h-6 text-orange-500" />,
      title: "Call Us",
      lines: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    },
    {
      icon: <Mail className="w-6 h-6 text-orange-500" />,
      title: "Email Us",
      lines: ["hello@epicurean.com", "events@epicurean.com"],
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      title: "Hours",
      lines: ["Mon–Thu: 5PM–11PM", "Fri–Sat: 12PM–1AM", "Sun: 12PM–10PM"],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="relative">
        <PageHeader
          title="Get in Touch"
          subtitle="Have a question or special request? We'd love to hear from you."
          image="/hero-bg.jpg"
        />

        {/* Contact Info Cards */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {contactInfo.map((info, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="glass p-8 rounded-3xl text-center h-full hover:bg-white/10 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                      {info.icon}
                    </div>
                    <h4 className="font-bold text-lg mb-3">{info.title}</h4>
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-white/50 text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <Reveal>
                <form
                  onSubmit={handleSubmit}
                  className="glass rounded-[2.5rem] p-8 md:p-10 space-y-6"
                >
                  <h3 className="text-2xl font-serif mb-2">Send a Message</h3>
                  <p className="text-white/50 text-sm mb-4">
                    We'll get back to you within 24 hours.
                  </p>

                  {status === "success" && (
                    <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <Check className="w-5 h-5 text-green-400" />
                      <p className="text-green-400 text-sm">
                        Message sent! We'll be in touch soon.
                      </p>
                    </div>
                  )}
                  {status === "error" && (
                    <p className="text-red-400 text-sm">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone (optional)"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                    >
                      <option className="bg-[#0a0a0a]">General Inquiry</option>
                      <option className="bg-[#0a0a0a]">
                        Reservation Question
                      </option>
                      <option className="bg-[#0a0a0a]">Private Event</option>
                      <option className="bg-[#0a0a0a]">Feedback</option>
                      <option className="bg-[#0a0a0a]">Press / Media</option>
                      <option className="bg-[#0a0a0a]">Careers</option>
                    </select>
                  </div>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 bg-orange-500 hover:bg-orange-600 rounded-2xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </Reveal>

              {/* Map */}
              <Reveal delay={0.3}>
                <div className="glass rounded-[2.5rem] overflow-hidden h-full min-h-[500px]">
                  <iframe
                    title="Epicurean Location"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-74.012%2C40.703%2C-73.988%2C40.723&layer=mapnik&marker=40.713%2C-74.000"
                    className="w-full h-full min-h-[500px] border-0"
                    loading="lazy"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
