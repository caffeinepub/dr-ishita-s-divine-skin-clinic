import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { useActor } from "@/hooks/useActor";
import {
  CheckCircle2,
  ChevronRight,
  Menu,
  Phone,
  Quote,
  Sparkles,
  Star,
  Stethoscope,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Book", href: "#booking" },
  { label: "Reviews", href: "#testimonials" },
  { label: "About", href: "#about" },
];

const SERVICES = [
  {
    id: 1,
    icon: Stethoscope,
    title: "Medical Dermatology",
    description:
      "Comprehensive care for skin conditions, treating the root causes with evidence-based medicine.",
    items: ["Acne & Acne Scars", "Eczema & Dermatitis", "Psoriasis Management"],
    color: "from-blue-50 to-blue-100",
  },
  {
    id: 2,
    icon: Sparkles,
    title: "Aesthetics & Cosmetology",
    description:
      "Premium cosmetic treatments to enhance your natural beauty and restore youthful radiance.",
    items: ["Dermal Fillers", "Chemical Peels", "Anti-Aging Therapies"],
    color: "from-teal-50 to-teal-100",
  },
  {
    id: 3,
    icon: Zap,
    title: "Advanced Laser Treatments",
    description:
      "State-of-the-art laser technology for precision skin resurfacing and rejuvenation.",
    items: ["Scar Removal", "Laser Hair Reduction", "Skin Brightening"],
    color: "from-cyan-50 to-cyan-100",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    text: "Dr. Ishita is incredibly thorough. She explained my treatment plan perfectly and the results on my skin are divine!",
    author: "Riya S.",
    initials: "RS",
  },
  {
    id: 2,
    text: "Best aesthetic clinic in the city. The laser treatments are painless and very effective. Highly recommend her expertise.",
    author: "Amit V.",
    initials: "AV",
  },
  {
    id: 3,
    text: "Finally found a dermatologist who cares about skin health as much as beauty. Professional and compassionate.",
    author: "Priyanka G.",
    initials: "PG",
  },
];

const SERVICE_OPTIONS = [
  "Medical Dermatology",
  "Aesthetics & Cosmetology",
  "Advanced Laser Treatments",
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function App() {
  const { actor } = useActor();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service || !form.date) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    try {
      if (actor) {
        await actor.submitAppointment(
          form.name,
          form.phone,
          form.service,
          form.date,
        );
      }
      setSubmitted(true);
      toast.success("Appointment request sent!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-clinic-lightgray font-body">
      <Toaster />

      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white shadow-nav">
        <div className="container-clinic flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <a
            href="#hero"
            className="font-display text-lg font-semibold text-clinic-blue leading-tight"
            data-ocid="nav.link"
          >
            Dr. Ishita&apos;s
            <span className="block text-sm font-normal text-clinic-teal tracking-wide">
              Divine Skin Clinic
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollTo(link.href.slice(1))}
                className="text-sm font-body text-clinic-dark/70 hover:text-clinic-blue transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("booking")}
              className="bg-clinic-teal hover:bg-clinic-teal/90 text-white font-body font-semibold px-5"
              data-ocid="nav.primary_button"
            >
              Book Appointment
            </Button>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden text-clinic-blue"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-white border-t border-border"
            >
              <div className="flex flex-col p-4 gap-3">
                {NAV_LINKS.map((link) => (
                  <button
                    type="button"
                    key={link.href}
                    onClick={() => {
                      scrollTo(link.href.slice(1));
                      setMobileOpen(false);
                    }}
                    className="text-sm text-clinic-dark/70 hover:text-clinic-blue text-left py-2"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  onClick={() => {
                    scrollTo("booking");
                    setMobileOpen(false);
                  }}
                  className="bg-clinic-teal hover:bg-clinic-teal/90 text-white w-full"
                  data-ocid="nav.primary_button"
                >
                  Book Appointment
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-[90vh] flex items-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-clinic.dim_1400x800.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-white/50" />
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-transparent" />

        <div className="relative container-clinic px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-block text-xs font-semibold tracking-widest text-clinic-teal uppercase mb-4 font-body">
              Medical Dermatology • Aesthetics • Laser Surgery
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-clinic-dark leading-tight mb-6">
              Divine Care for Your{" "}
              <em className="text-clinic-blue not-italic">
                Skin&apos;s Health
              </em>{" "}
              &amp; Beauty.
            </h1>
            <p className="font-body text-lg text-clinic-dark/75 mb-10 leading-relaxed">
              Expert Dermatological &amp; Aesthetic Solutions by Dr. Ishita,
              Certified Dermatologist &amp; Fellow in Aesthetics.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => scrollTo("booking")}
                className="bg-clinic-teal hover:bg-clinic-teal/90 text-white font-semibold text-base px-8 py-6 shadow-lg shadow-teal-200"
                data-ocid="hero.primary_button"
              >
                Book Your Appointment
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("services")}
                className="border-clinic-blue text-clinic-blue hover:bg-clinic-blue hover:text-white font-semibold text-base px-8 py-6"
              >
                Explore Services
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-clinic-dark/60 font-body">
              {[
                "MBBS, MD Dermatology",
                "Fellow in Aesthetics & Lasers",
                "500+ Happy Patients",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-clinic-teal flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-padding bg-white">
        <div className="container-clinic">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold tracking-widest text-clinic-teal uppercase font-body">
              What We Offer
            </span>
            <h2 className="font-display text-4xl font-bold text-clinic-dark mt-2">
              Our Expertise
            </h2>
            <p className="mt-4 text-clinic-dark/60 font-body max-w-xl mx-auto">
              A comprehensive range of dermatological and aesthetic services,
              delivered with precision and care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 group border border-border"
                data-ocid={`services.card.${service.id}`}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}
                >
                  <service.icon className="w-7 h-7 text-clinic-blue" />
                </div>
                <h3 className="font-display text-xl font-semibold text-clinic-dark mb-3">
                  {service.title}
                </h3>
                <p className="text-clinic-dark/60 font-body text-sm leading-relaxed mb-5">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-clinic-dark/70 font-body"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-clinic-teal flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => scrollTo("booking")}
                  className="text-clinic-teal font-semibold text-sm font-body flex items-center gap-1 group-hover:gap-2 transition-all"
                  data-ocid={`services.link.${service.id}`}
                >
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="section-padding bg-clinic-lightgray">
        <div className="container-clinic">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold tracking-widest text-clinic-teal uppercase font-body">
              Get In Touch
            </span>
            <h2 className="font-display text-4xl font-bold text-clinic-dark mt-2">
              Schedule Your Consultation
            </h2>
            <p className="mt-3 text-clinic-teal font-body font-semibold">
              ✦ Quick appointments available for urgent skin concerns.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 bg-white rounded-2xl shadow-card p-8"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                    data-ocid="booking.success_state"
                  >
                    <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-9 h-9 text-clinic-teal" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-clinic-dark mb-2">
                      Request Received!
                    </h3>
                    <p className="text-clinic-dark/60 font-body">
                      We&apos;ll confirm your appointment shortly. For urgent
                      concerns, call us directly.
                    </p>
                    <Button
                      className="mt-6 bg-clinic-teal hover:bg-clinic-teal/90 text-white"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", phone: "", service: "", date: "" });
                      }}
                    >
                      Book Another
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label className="font-body text-sm text-clinic-dark/80 font-semibold">
                          Full Name
                        </Label>
                        <Input
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className="border-border focus:ring-clinic-teal font-body"
                          data-ocid="booking.input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-body text-sm text-clinic-dark/80 font-semibold">
                          Phone Number
                        </Label>
                        <Input
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          className="border-border font-body"
                          data-ocid="booking.input"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-body text-sm text-clinic-dark/80 font-semibold">
                        Service Required
                      </Label>
                      <Select
                        value={form.service}
                        onValueChange={(v) => setForm({ ...form, service: v })}
                      >
                        <SelectTrigger
                          className="border-border font-body"
                          data-ocid="booking.select"
                        >
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICE_OPTIONS.map((s) => (
                            <SelectItem key={s} value={s} className="font-body">
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-body text-sm text-clinic-dark/80 font-semibold">
                        Preferred Date
                      </Label>
                      <Input
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                          setForm({ ...form, date: e.target.value })
                        }
                        className="border-border font-body"
                        data-ocid="booking.input"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-clinic-teal hover:bg-clinic-teal/90 text-white font-semibold font-body py-6 text-base"
                      data-ocid="booking.submit_button"
                    >
                      {submitting ? "Submitting..." : "Request Appointment"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* CTA side panel */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              {/* Call Now Card */}
              <div className="bg-clinic-blue rounded-2xl p-8 text-white text-center shadow-card">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  Call Us Directly
                </h3>
                <p className="text-blue-100 text-sm font-body mb-5">
                  Speak to our team for immediate assistance or same-day
                  consultations.
                </p>
                <a href="tel:+918287139498">
                  <Button
                    className="bg-white text-clinic-blue hover:bg-blue-50 font-semibold font-body w-full text-base py-5"
                    data-ocid="booking.button"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    +91-8287139498
                  </Button>
                </a>
              </div>

              {/* Hours card */}
              <div className="bg-white rounded-2xl p-6 shadow-card border border-border">
                <h4 className="font-display text-base font-semibold text-clinic-dark mb-4">
                  Clinic Hours
                </h4>
                {[
                  { day: "Mon – Fri", time: "9:00 AM – 7:00 PM" },
                  { day: "Saturday", time: "10:00 AM – 5:00 PM" },
                  { day: "Sunday", time: "By Appointment" },
                ].map(({ day, time }) => (
                  <div
                    key={day}
                    className="flex justify-between text-sm font-body py-2 border-b border-border last:border-0 text-clinic-dark/70"
                  >
                    <span className="font-semibold text-clinic-dark">
                      {day}
                    </span>
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="section-padding bg-white">
        <div className="container-clinic">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold tracking-widest text-clinic-teal uppercase font-body">
              Real Stories
            </span>
            <h2 className="font-display text-4xl font-bold text-clinic-dark mt-2">
              Patient Transformations
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-card border border-border relative"
                data-ocid={`testimonials.card.${t.id}`}
              >
                <Quote className="w-8 h-8 text-clinic-blue/15 absolute top-6 right-6" />
                <StarRating />
                <p className="mt-4 text-clinic-dark/75 font-body text-sm leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-clinic-blue to-clinic-teal flex items-center justify-center text-white text-xs font-bold font-body">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-clinic-dark font-body">
                      — {t.author}
                    </p>
                    <p className="text-xs text-clinic-teal font-body">
                      Verified Patient
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Before & After gallery placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-2xl font-semibold text-clinic-dark text-center mb-8">
              Before &amp; After Results
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-teal-100 h-52 flex flex-col items-center justify-center gap-2 border border-border/50"
                >
                  <span className="font-display text-2xl text-clinic-blue/60 font-semibold">
                    Before &amp; After
                  </span>
                  <span className="text-xs font-body font-semibold tracking-widest text-clinic-teal/70 uppercase">
                    Results Gallery — Coming Soon
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="section-padding bg-clinic-lightgray"
        data-ocid="about.section"
      >
        <div className="container-clinic">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-clinic-blue/10 to-clinic-teal/10 rounded-3xl -z-10" />
              <img
                src="/assets/generated/dr-ishita-portrait.dim_600x700.jpg"
                alt="Dr. Ishita — Certified Dermatologist"
                className="w-full max-w-md mx-auto rounded-2xl shadow-card-hover object-cover"
              />
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-xs font-semibold tracking-widest text-clinic-teal uppercase font-body">
                Meet Your Doctor
              </span>
              <h2 className="font-display text-4xl font-bold text-clinic-dark mt-2 mb-5">
                Dr. Ishita
              </h2>

              {/* Credential badges */}
              <div className="flex flex-wrap gap-2 mb-7">
                {[
                  "Certified Dermatologist",
                  "Cosmetology Physician",
                  "Fellow in Aesthetics & Lasers",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold font-body bg-teal-50 text-clinic-teal border border-teal-200"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="space-y-4 text-clinic-dark/70 font-body leading-relaxed">
                <p>
                  Dr. Ishita brings together the precision of clinical
                  dermatology and the artistry of aesthetic medicine to deliver
                  results that are both medically sound and beautifully
                  transformative. With her MBBS and MD in Dermatology,
                  complemented by a fellowship in Aesthetics &amp; Lasers, she
                  combines deep scientific expertise with a genuine passion for
                  patient well-being.
                </p>
                <p>
                  Her approach is always holistic — treating not just the skin,
                  but the whole person. Whether managing complex dermatological
                  conditions or crafting bespoke aesthetic plans, Dr.
                  Ishita&apos;s dedication is evident in every consultation. Her
                  patients trust her for her thoroughness, compassion, and the
                  remarkable, lasting outcomes she achieves.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                {[
                  { num: "500+", label: "Happy Patients" },
                  { num: "8+", label: "Years Experience" },
                  { num: "3", label: "Specialisations" },
                ].map(({ num, label }) => (
                  <div
                    key={label}
                    className="bg-white rounded-xl p-4 shadow-card border border-border"
                  >
                    <p className="font-display text-2xl font-bold text-clinic-blue">
                      {num}
                    </p>
                    <p className="text-xs font-body text-clinic-dark/60 mt-1">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-clinic-dark text-white">
        <div className="container-clinic section-padding">
          <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
            <div>
              <h3 className="font-display text-xl font-semibold mb-3">
                Dr. Ishita&apos;s Divine Skin Clinic
              </h3>
              <p className="text-white/60 font-body text-sm leading-relaxed">
                Expert dermatological and aesthetic care that transforms skin
                health and restores confidence.
              </p>
            </div>
            <div>
              <h4 className="font-body font-semibold text-sm uppercase tracking-widest text-clinic-teal mb-4">
                Our Services
              </h4>
              <ul className="space-y-2 text-sm text-white/60 font-body">
                {SERVICE_OPTIONS.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-body font-semibold text-sm uppercase tracking-widest text-clinic-teal mb-4">
                Contact
              </h4>
              <a
                href="tel:+918287139498"
                className="flex items-center gap-2 text-white/80 hover:text-clinic-teal transition-colors font-body text-sm"
              >
                <Phone className="w-4 h-4" />
                +91-8287139498
              </a>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40 font-body">
            <p>
              © {new Date().getFullYear()} Dr. Ishita&apos;s Divine Skin Clinic.
              All rights reserved.
            </p>
            <p>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-clinic-teal transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
