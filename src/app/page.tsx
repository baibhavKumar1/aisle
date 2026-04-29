'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import PopArtSVG from '@/components/PopArtSVG';
import PopArtForm from '@/components/PopArtForm';
import ContactSection from '@/components/ContactSection';

const PROGRAMS = [
  { name: 'Haldi', icon: 'wb_sunny', religion: 'Hindu' },
  { name: 'Nikah', icon: 'auto_stories', religion: 'Muslim' },
  { name: 'Anand Karaj', icon: 'temple_hindu', religion: 'Sikh' },
  { name: 'Church Wedding', icon: 'church', religion: 'Christian' },
  { name: 'Mehndi', icon: 'palette', religion: 'Hindu/Muslim' },
  { name: 'Sangeet', icon: 'music_note', religion: 'South Asian' },
  { name: 'Phera', icon: 'favorite', religion: 'Hindu' },
  { name: 'Valima', icon: 'restaurant', religion: 'Muslim' },
];

const ACTIVATIONS = [
  {
    title: 'Curated Bar Experience',
    icon: 'local_bar',
    desc: "Your spirit or beverage brand, presented as the couple's personal selection. Full bar branding — zero ad feel.",
    tags: 'Spirits · Beverage'
  },
  {
    title: 'Luxury Welcome Kits',
    icon: 'card_giftcard',
    desc: 'Your product placed in hand-assembled guest hampers. Skincare, fragrance, snacks — with a personal note.',
    tags: 'FMCG · Beauty · Food'
  },
  {
    title: 'Branded Gifting Lounge',
    icon: 'shopping_bag',
    desc: 'A curated gifting corner during cocktail hour — 100% branded, designed to feel like a pop-up boutique.',
    tags: 'Lifestyle · Home'
  },
  {
    title: 'Photo & Memory Stations',
    icon: 'camera_enhance',
    desc: 'Branded photo booths or instant-print stations guests love — your logo subtly present on every print.',
    tags: 'Tech · Insurance · Auto'
  },
  {
    title: 'Décor Integration',
    icon: 'format_paint',
    desc: 'Floral arrangements, furniture, linen, or crockery — your product lives in the visual fabric of the event.',
    tags: 'Home · Luxury · Décor'
  },
  {
    title: 'Post-Wedding Gift Box',
    icon: 'inventory_2',
    desc: "Your product delivered to the couple's home post-wedding — captured on social by the couple themselves.",
    tags: 'E-commerce · Premium'
  },
];

const NAVBAR_LINKS = [
  { name: 'Blueprint', href: '#the-blueprint' },
  { name: 'Activations', href: '#activations' },
  { name: 'Programs', href: '#programs' },
  { name: 'Proof', href: '#the-proof' },
  { name: 'Join Waitlist', href: '#waitlist', primary: true },
];

const COLORS = [
  { bg: 'bg-[#E2007B]', text: 'text-white' }, // Pink
  { bg: 'bg-[#FFDF94]', text: 'text-black' }, // Yellow
  { bg: 'bg-white', text: 'text-black' },      // White
];

export default function Home() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ACTIVATIONS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % ACTIVATIONS.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + ACTIVATIONS.length) % ACTIVATIONS.length);

  return (
    <div ref={containerRef} className="bg-surface text-on-surface">
      {/* Header */}
      <header className="bg-white font-headline font-black uppercase tracking-tighter top-0 border-b-4 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)] flex justify-between items-center w-full px-6 md:px-margin-desktop py-4 sticky z-50">
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="text-xl font-black text-[#0032A0] border-4 border-black px-2 py-1 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <img src="/logo.png" className='h-8 w-auto md:h-12 md:w-44' alt="theaisle Logo" />
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-4 items-center">
          {NAVBAR_LINKS.map((link) => (
            <motion.a
              key={link.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`font-label-bold uppercase px-4 py-2 brutal-border brutal-shadow transition-all ${link.primary
                  ? 'bg-primary-container text-white'
                  : 'bg-white text-black hover:bg-tertiary-fixed'
                }`}
              href={link.href}
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden brutal-border brutal-shadow bg-white p-2 flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-black font-bold">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-[100%] left-0 w-full bg-[#0032A0] border-b-4 border-black p-6 flex flex-col gap-4 z-40 lg:hidden overflow-hidden"
            >
              {NAVBAR_LINKS.map((link) => (
                <a
                  key={link.name}
                  onClick={() => setMenuOpen(false)}
                  className={`font-label-bold uppercase px-6 py-4 brutal-border brutal-shadow text-center transition-all ${link.primary
                      ? 'bg-[#E2007B] text-white'
                      : 'bg-white text-black'
                    }`}
                  href={link.href}
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        {/* Section 1: Hero & Form */}
        <section id="waitlist" className="relative w-full px-6 md:px-margin-desktop py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center overflow-hidden">
          {/* Background Motif */}
          <div className="absolute top-0 left-0 w-full md:w-2/3 h-full opacity-30 md:opacity-50 z-0 pointer-events-none">
            <PopArtSVG />
          </div>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative z-10"
          >
            <h1 className="font-headline text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9] text-on-surface mb-6 md:mb-8 font-bold ">
              You Marry, <br className="hidden md:block" />
              <span className="text-white bg-[#E2007B] brutal-border brutal-shadow px-3 md:px-6 inline-block mt-2 md:mt-4">Brands Pay</span>
            </h1>
            <p className="font-body text-base md:text-body-lg text-on-surface-variant mb-8 md:mb-10 max-w-2xl">
              Reject the muted beige. Join the most high-octane, visually explosive Indian wedding celebration of the year. Unprecedented reach, unbridled energy.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative w-full aspect-video md:h-[400px] brutal-border brutal-shadow overflow-hidden group"
            >
              <img
                alt="Pop Art Wedding Motif"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="/image3.png"
              />
              <div className="absolute top-4 right-4 bg-[#FFDF94] brutal-border px-4 py-1 font-headline font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">2026 Season</div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative z-20"
          >
            <PopArtForm />
          </motion.div>
        </section>

        {/* Section 2: Activation Formats (Carousel) */}
        <section id="activations" className="w-full py-16 md:py-24 bg-[#0032A0] border-y-4 border-black relative overflow-hidden">
          <div className="px-6 md:px-margin-desktop flex flex-col items-center mb-12 md:mb-20">
            <div className="bg-white brutal-border brutal-shadow px-8 md:px-16 py-4">
              <h2 className="font-headline text-3xl md:text-5xl text-black uppercase tracking-tighter font-black text-center">Activation Formats</h2>
            </div>
          </div>

          <div className="relative w-full mx-auto h-[550px] md:h-[700px] flex items-center justify-center overflow-hidden">
            <div className="flex items-center justify-center relative w-full h-full">
              {ACTIVATIONS.map((card, index) => {
                let position = index - activeIndex;
                const total = ACTIVATIONS.length;

                if (position <= -Math.floor(total / 2)) position += total;
                if (position > Math.floor(total / 2)) position -= total;

                const isVisible = isMobile ? Math.abs(position) <= 1 : Math.abs(position) <= 2;
                const isCenter = position === 0;
                const isInner = Math.abs(position) === 1;

                const color = COLORS[index % 3];
                const xOffset = isMobile ? position * 300 : position * 280;
                const cardWidth = isMobile ? '280px' : '340px';

                return (
                  <motion.div
                    key={card.title}
                    initial={false}
                    animate={{
                      x: xOffset,
                      scale: isCenter ? (isMobile ? 1.05 : 1.2) : (isInner ? 0.9 : 0.8),
                      opacity: isVisible ? 1 : 0,
                      zIndex: 30 - Math.abs(position) * 10,
                      height: isMobile ? '400px' : '480px',
                    }}
                    transition={{
                      type: 'tween',
                      stiffness: 200,
                      damping: 20,
                    }}
                    style={{ width: cardWidth }}
                    className={`absolute ${color.bg} ${color.text} brutal-border p-8 md:p-10 brutal-shadow flex flex-col justify-between overflow-hidden`}
                  >
                    <div>
                      <span className="material-symbols-outlined mb-6" style={{ fontVariationSettings: "'FILL' 1", fontSize: isMobile ? "50px" : "70px" }}>
                        {card.icon}
                      </span>
                      <h3 className="font-headline text-2xl md:text-4xl font-black uppercase mb-4 leading-[0.9]">
                        {card.title}
                      </h3>
                      <p className="font-body text-sm md:text-base opacity-90 line-clamp-6 font-medium">
                        {card.desc}
                      </p>
                    </div>
                    <div>
                      <div className={`w-full h-1 ${color.text === 'text-white' ? 'bg-white' : 'bg-black'} mb-4 opacity-30`}></div>
                      <span className="font-label-bold text-xs md:text-sm uppercase tracking-widest font-black italic">
                        {card.tags}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-12 z-40 bg-white brutal-border brutal-shadow p-3 md:p-4 hover:bg-[#FFDF94] transition-colors active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <span className="material-symbols-outlined text-black font-black">arrow_back</span>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-12 z-40 bg-white brutal-border brutal-shadow p-3 md:p-4 hover:bg-[#FFDF94] transition-colors active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <span className="material-symbols-outlined text-black font-black">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Section: The Proof (Bento Grid) */}
        <section id="the-proof" className="w-full px-6 md:px-margin-desktop py-20 md:py-24 bg-surface border-b-4 border-black">
          <div className="mb-16 md:mb-20 text-center flex flex-col items-center">
            <div className="bg-[#FFDF94] brutal-border brutal-shadow px-10 md:px-20 py-4">
              <h2 className="font-headline text-3xl md:text-5xl text-black uppercase font-black tracking-tight">The Proof</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:h-[900px]">
            <motion.div
              whileHover={{ scale: 0.99 }}
              className="md:col-span-2 md:row-span-2 brutal-border brutal-shadow overflow-hidden relative group aspect-[4/5] md:aspect-auto"
            >
              <img src="/image1.png" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="Wedding Event" />
              <div className="absolute bottom-6 left-6 bg-[#FFDF94] brutal-border px-6 py-2 font-headline uppercase font-black text-sm md:text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">Main Event 2026</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 0.99 }}
              className="md:col-span-2 brutal-border brutal-shadow overflow-hidden relative group aspect-video md:aspect-auto"
            >
              <img src="/image2.png" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="Crowd" />
              <div className="absolute top-6 right-6 bg-[#E2007B] brutal-border px-6 py-2 font-headline uppercase font-black text-white text-sm md:text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">5000+ Attendees</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 0.99 }}
              className="brutal-border brutal-shadow overflow-hidden relative group aspect-video md:aspect-auto"
            >
              <img src="/image4.png" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="Stage" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 0.99 }}
              className="brutal-border brutal-shadow overflow-hidden relative group aspect-video md:aspect-auto"
            >
              <img src="/image5.png" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="Fashion" />
            </motion.div>
          </div>
        </section>

        {/* Section: The Blueprint */}
        <section id="the-blueprint" className="w-full py-20 md:py-24 bg-[#0032A0] relative overflow-hidden border-y-4 border-black">
          <div className="px-6 md:px-margin-desktop relative z-10 flex flex-col items-center">
            <div className="bg-white brutal-border brutal-shadow px-10 md:px-20 py-4 mb-16 md:mb-24">
              <h2 className="font-headline text-3xl md:text-5xl text-black uppercase font-black tracking-tight">The Blueprint</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-12 w-full max-w-6xl">
              {[
                { step: 1, title: 'BUILD THE DECK', icon: 'campaign', desc: 'Transform your wedding into a disruptive marketing powerhouse. Design a celebration that brands can\'t help but fund.', color: 'bg-white', text: 'text-black', iconColor: 'text-[#0032A0]' },
                { step: 2, title: 'ALIGN THE VIBE', icon: 'handshake', desc: 'Our algorithm matches your energy with elite sponsors who crave authentic exposure. We cut the corporate red tape.', color: 'bg-[#FFDF94]', text: 'text-black', iconColor: 'text-[#E2007B]' },
                { step: 3, title: 'BREAK THE INTERNET', icon: 'rocket_launch', desc: 'Execute the spectacle. From custom neon bars to viral AI activations, turn your big day into a legendary cultural moment.', color: 'bg-white', text: 'text-black', iconColor: 'text-[#0032A0]' },
              ].map((item) => (
                <div key={item.step} className="relative group">
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 ${item.step === 2 ? 'bg-[#0032A0] text-white' : 'bg-[#E2007B] text-white'} rounded-full brutal-border brutal-shadow flex items-center justify-center font-headline text-2xl md:text-3xl z-20 group-hover:scale-110 transition-transform font-black`}>{item.step}</div>
                  <div className={`${item.color} brutal-border brutal-shadow p-8 md:p-12 pt-16 md:pt-20 flex flex-col items-center text-center h-full`}>
                    <span className={`material-symbols-outlined ${item.iconColor} mb-8`} style={{ fontSize: isMobile ? '80px' : '120px' }}>{item.icon}</span>
                    <h3 className="font-headline text-2xl md:text-3xl font-black mb-6 text-black leading-none">{item.title}</h3>
                    <p className={`font-body text-base md:text-lg ${item.text}/80 font-medium`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Programs Covered (Carousel) */}
        <section id="programs" className="w-full py-20 md:py-24 bg-surface border-b-4 border-black overflow-hidden">
          <div className="px-6 md:px-margin-desktop flex flex-col items-center mb-16 md:mb-20 text-center">
            <div className="bg-[#E2007B] brutal-border brutal-shadow px-10 md:px-20 py-4 text-white">
              <h2 className="font-headline text-3xl md:text-5xl uppercase font-black tracking-tight">Programs Covered</h2>
            </div>
          </div>

          <div className="relative w-full max-w-[1600px] mx-auto h-[550px] md:h-[650px] flex items-center justify-center overflow-hidden">
            <div className="flex items-center justify-center relative w-full h-full">
              {PROGRAMS.map((item, index) => {
                let position = index - activeIndex;
                const total = PROGRAMS.length;

                if (position <= -Math.floor(total / 2)) position += total;
                if (position > Math.floor(total / 2)) position -= total;

                const isVisible = isMobile ? Math.abs(position) <= 1 : (position >= -1 && position <= 2);
                const isCenter = isMobile ? position === 0 : (position === 0 || position === 1);

                const color = COLORS[index % 3];

                const xOffset = isMobile ? position * 300 : (position * 400 - 200);
                const cardWidth = isMobile ? '280px' : '360px';
                const cardHeight = isMobile ? '420px' : '520px';

                return (
                  <motion.div
                    key={`${item.name}-${index}`}
                    initial={false}
                    animate={{
                      x: xOffset,
                      scale: isMobile ? (isCenter ? 1 : 0.85) : (Math.abs(position - 0.5) < 1 ? 1 : 0.85),
                      opacity: isVisible ? 1 : 0,
                      zIndex: 30 - Math.abs(position - 0.5) * 10,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 25,
                    }}
                    style={{ width: cardWidth, height: cardHeight }}
                    className={`absolute ${color.bg} ${color.text} brutal-border p-8 md:p-12 brutal-shadow flex flex-col items-center justify-between text-center overflow-hidden`}
                  >
                    <div className="w-full relative">

                      <span className="material-symbols-outlined mt-8 opacity-90" style={{ fontSize: isMobile ? '100px' : '150px', fontVariationSettings: "'FILL' 1" }}>
                        {item.icon}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <h4 className="font-headline text-3xl md:text-5xl font-black uppercase mb-4 leading-none tracking-tighter">
                        {item.name}
                      </h4>
                      <div className={`w-16 md:w-24 h-2 md:h-3 ${color.text === 'text-white' ? 'bg-white' : 'bg-black'} mt-2`}></div>
                    </div>

                    <span className="font-label-bold text-xs md:text-sm uppercase tracking-[0.3em] font-black opacity-80">
                      Standard Coverage
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <ContactSection />

        <footer className="bg-[#FFDF94] font-headline font-black uppercase text-sm w-full border-t-4 border-black p-12 md:p-20 flex flex-col md:flex-row justify-between items-center gap-12 z-40 relative">
          <div className="text-3xl font-black text-black border-4 border-black px-4 py-2 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <img src="/logo.png" className='w-48' alt="theaisle Logo" />
          </div>

          <nav className="flex flex-wrap gap-8 md:gap-12 justify-center">
            <a className="text-black hover:text-[#0032A0] transition-all font-black text-lg md:text-xl underline decoration-4 underline-offset-8" href="https://canva.link/q2ugotshzypt7j8" target='_blank' rel="noopener noreferrer">Sponsor Deck</a>
            <a className="text-black hover:text-[#0032A0] transition-all font-black text-lg md:text-xl underline decoration-4 underline-offset-8" href="#contact">Contact</a>
          </nav>
        </footer>
      </main>
    </div>
  );
}
