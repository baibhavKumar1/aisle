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
  { title: 'The Sangeet Stage', icon: 'celebration', desc: 'Complete visual dominance over the main performance area. High-energy branding integration.' },
  { title: 'Feast Pavilion', icon: 'restaurant_menu', desc: 'Culinary sponsorship featuring bold tablescapes, custom neon menus, and immersive dining.' },
  { title: 'Baraat Fuel', icon: 'local_bar', desc: 'Mobile activation unit during the high-octane procession. Direct engagement with the crowd.' },
  { title: 'Mandap Takeover', icon: 'temple_hindu', desc: 'Sacred space branding with tasteful yet bold floral and lighting integrations.' },
  { title: 'Pop-Art Booth', icon: 'camera_enhance', desc: 'Interactive photo experiences with real-time AI filters and instant social sharing.' },
];

const NAVBAR_LINKS = [
  { name: 'Blueprint', href: '#the-blueprint' },
  { name: 'Activations', href: '#activations' },
  { name: 'Programs', href: '#programs' },
  { name: 'Proof', href: '#the-proof' },
  { name: 'Join Waitlist', href: '#waitlist', primary: true },
];

const COLORS = [
  { bg: 'bg-[#FFB800]', text: 'text-black' }, // Yellow
  { bg: 'bg-[#E2007B]', text: 'text-white' }, // Pink
  { bg: 'bg-white', text: 'text-black' },      // White
];

export default function Home() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
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
      <header className="bg-white font-headline font-black uppercase tracking-tighter top-0 border-b-4 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)] flex justify-between items-center w-full px-8 py-4 sticky z-50">
        <motion.div 
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="text-xl font-black text-[#0032A0] border-4 border-black px-2 py-1 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <img src="/logo.png" className='h-10 w-auto md:h-12 md:w-44' alt="theaisle Logo"/>
        </motion.div>
        
        <nav className="hidden lg:flex gap-4 items-center">
          {NAVBAR_LINKS.map((link) => (
            <motion.a
              key={link.name}
              whileHover={{ scale: 1.05}}
              whileTap={{ scale: 0.95 }}
              className={`font-label-bold uppercase px-4 py-2 brutal-border brutal-shadow transition-all ${
                link.primary 
                  ? 'bg-primary-container text-white' 
                  : 'bg-white text-black hover:bg-tertiary-fixed'
              }`}
              href={link.href}
            >
              {link.name}
            </motion.a>
          ))}
        </nav>
      </header>

      <main className="flex-grow">
        {/* Section 1: Hero & Form */}
        <section id="waitlist" className="relative w-full px-margin-mobile md:px-margin-desktop py-20 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center overflow-hidden">
          {/* Background Motif */}
          <div className="absolute top-0 left-0 w-2/3 h-full opacity-50 z-0 pointer-events-none">
             <PopArtSVG />
          </div>

          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative z-10 pr-0 md:pr-10"
          >
            <h1 className="font-headline text-[clamp(3.5rem,10vw,6rem)] leading-[0.95] text-on-surface mb-8 font-bold">
              Not Advertising, <br/>
              <span className="text-secondary-container font-body bg-surface-container-lowest brutal-border px-4 inline-block mt-4">An Experience</span>
            </h1>
            <p className="font-body text-body-lg text-on-surface-variant mb-10 max-w-2xl">
              Reject the muted beige. Join the most high-octane, visually explosive Indian wedding celebration of the year. Unprecedented reach, unbridled energy.
            </p>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative w-full h-[400px] brutal-border brutal-shadow overflow-hidden group"
            >
              <img 
                alt="Pop Art Wedding Motif" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                src="/image3.png"
              />
              <div className="absolute inset-0 bg-[#E2007B]/20 mix-blend-multiply"></div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative z-20 mt-12 lg:mt-0"
          >
            <PopArtForm />
          </motion.div>
        </section>

        {/* Section 2: Activation Formats (Carousel) */}
        <section id="activations" className="w-full py-24 bg-[#0032A0] border-b-4 border-black relative overflow-hidden">
          <div className="px-margin-mobile md:px-margin-desktop flex flex-col items-center mb-16">
            <div className="bg-white brutal-border brutal-shadow px-12 py-4">
              <h2 className="font-headline text-headline-lg text-black uppercase tracking-widest font-bold">Activation Formats</h2>
            </div>
          </div>
          
          <div className="relative w-full mx-auto h-[650px] flex items-center justify-center overflow-hidden">
            <div className="flex items-center justify-center relative w-full h-full">
              {ACTIVATIONS.map((card, index) => {
                let position = index - activeIndex;
                const total = ACTIVATIONS.length;
                
                // Handle circular wrapping for 5 visible cards
                if (position <= -Math.floor(total / 2)) position += total;
                if (position > Math.floor(total / 2)) position -= total;

                const isVisible = Math.abs(position) <= 2;
                const isCenter = position === 0;
                const isInner = Math.abs(position) === 1;
                const color = COLORS[index % 3];

                return (
                  <motion.div
                    key={card.title}
                    initial={false}
                    animate={{
                      x: position * 250,
                      scale: isCenter ? 1.2 : (isInner ? 1 : 0.8),
                      opacity: isVisible ? 1 : 0,
                      zIndex: 30 - Math.abs(position) * 10,
                      height: '420px',
                    }}
                    transition={{ 
                      type: 'tween', 
                      stiffness: 60, 
                      damping: 25,
                      height: { duration: 0.4 },
                      scale: { duration: 0.4 }
                    }}
                    className={`absolute ${color.bg} ${color.text} brutal-border p-8 brutal-shadow w-[320px] flex flex-col justify-between overflow-hidden`}
                  >
                    <div>
                      <span className="material-symbols-outlined text-[140px] mb-4 opacity-90" style={{ fontVariationSettings: "'FILL' 1" , fontSize:"50px"}}>
                        {card.icon}
                      </span>
                      <h3 className="font-headline text-2xl md:text-3xl font-black uppercase mb-3 leading-none">
                        {card.title}
                      </h3>
                      <p className="font-body text-base opacity-90 line-clamp-4">
                        {card.desc}
                      </p>
                    </div>
                    <div>
                      <div className={`w-full h-1 ${color.text === 'text-white' ? 'bg-white' : 'bg-black'} mb-3 opacity-40`}></div>
                      <span className="font-label-bold text-[10px] md:text-xs uppercase tracking-widest">
                        Tier {index + 1} Elite Partner
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 md:left-8 z-40 bg-white brutal-border brutal-shadow p-3 hover:bg-[#FFB800] transition-colors"
            >
              <span className="material-symbols-outlined text-black font-bold">arrow_back</span>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 md:right-12 z-40 bg-white brutal-border brutal-shadow p-3 hover:bg-[#FFB800] transition-colors"
            >
              <span className="material-symbols-outlined text-black font-bold">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Section: The Proof (Bento Grid) */}
        <section id="the-proof" className="w-full px-margin-mobile md:px-margin-desktop py-24 bg-surface border-b-4 border-black">
          <div className="mb-16 text-center flex flex-col items-center">
             <div className="bg-[#FFB800] brutal-border brutal-shadow px-12 py-4">
              <h2 className="font-headline text-headline-lg text-black uppercase tracking-widest font-bold">The Proof</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px]">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-2 md:row-span-2 brutal-border brutal-shadow overflow-hidden relative group"
            >
              <img src="/image1.png" className="w-full h-full object-cover  transition-all duration-500" alt="Wedding Event" />
              <div className="absolute bottom-4 left-4 bg-[#FFB800] brutal-border px-4 py-2 font-headline uppercase font-bold">Main Event 2026</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-2 brutal-border brutal-shadow overflow-hidden relative group"
            >
              <img src="/image2.png" className="w-full h-full object-cover  transition-all duration-500" alt="Crowd" />
              <div className="absolute top-4 right-4 bg-[#E2007B] brutal-border px-4 py-2 font-headline uppercase font-bold text-white">5000+ Attendees</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="brutal-border brutal-shadow overflow-hidden relative group"
            >
              <img src="/image4.png" className="w-full h-full object-cover  transition-all duration-500" alt="Stage" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="brutal-border brutal-shadow overflow-hidden relative group"
            >
              <img src="/image5.png" className="w-full h-full object-cover  transition-all duration-500" alt="Fashion" />
            </motion.div>
          </div>
        </section>
      </main>

      {/* Section: The Blueprint (Consistency Check) */}
        <section id="the-blueprint" className="w-full py-24 bg-[#0032A0] relative overflow-hidden border-y-4 border-black">
          <div className="px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col items-center">
            <div className="bg-white brutal-border brutal-shadow px-12 py-4 mb-16">
              <h2 className="font-headline text-headline-lg text-black uppercase tracking-widest font-bold">The Blueprint</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl">
              {[
                { step: 1, title: 'BUILD THE DECK', icon: 'campaign', desc: 'Transform your wedding into a disruptive marketing powerhouse. Design a celebration that brands can\'t help but fund.', color: 'bg-white', text: 'text-black', iconColor: 'text-[#0032A0]' },
                { step: 2, title: 'ALIGN THE VIBE', icon: 'handshake', desc: 'Our algorithm matches your energy with elite sponsors who crave authentic exposure. We cut the corporate red tape.', color: 'bg-[#FFDF94]', text: 'text-black', iconColor: 'text-[#E2007B]' },
                { step: 3, title: 'BREAK THE INTERNET', icon: 'rocket_launch', desc: 'Execute the spectacle. From custom neon bars to viral AI activations, turn your big day into a legendary cultural moment.', color: 'bg-white', text: 'text-black', iconColor: 'text-[#0032A0]' },
              ].map((item) => (
                <div key={item.step} className="relative group">
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 ${item.step === 2 ? 'bg-[#0032A0] text-white' : 'bg-[#E2007B] text-white'} rounded-full brutal-border brutal-shadow flex items-center justify-center font-headline text-2xl z-20 group-hover:scale-110 transition-transform`}>{item.step}</div>
                  <div className={`${item.color} brutal-border brutal-shadow p-10 pt-16 flex flex-col items-center text-center h-full`}>
                    <span className={`material-symbols-outlined ${item.iconColor} mb-6`} style={{ fontSize: '140px' }}>{item.icon}</span>
                    <h3 className="font-headline text-2xl font-black mb-4 text-black">{item.title}</h3>
                    <p className={`font-body ${item.text}/70`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
 
      {/* Section 3: Programs Covered (Carousel) */}
        <section id="programs" className="w-full py-24 bg-surface border-b-4 border-black overflow-hidden">
          <div className="px-margin-mobile md:px-margin-desktop flex flex-col items-center mb-16 text-center">
            <div className="bg-[#E2007B] brutal-border brutal-shadow px-12 py-4 text-white">
              <h2 className="font-headline text-headline-lg uppercase tracking-widest font-bold">Programs Covered</h2>
            </div>
          </div>
          
          <div className="relative w-full max-w-[1600px] mx-auto h-[600px] flex items-center justify-center overflow-hidden">
            <div className="flex items-center justify-center relative w-full h-full">
              {PROGRAMS.map((item, index) => {
                let position = index - activeIndex;
                const total = PROGRAMS.length;
                
                // Adjust circular wrapping for 4 visible cards (offset slightly)
                if (position <= -Math.floor(total / 2)) position += total;
                if (position > Math.floor(total / 2)) position -= total;

                // We want 4 cards visible, so we check abs(position) <= 1.5 or similar
                // But let's show 4 cards by adjusting opacity and x-offset
                const isVisible = position >= -1 && position <= 2; 
                const isCenter = position === 0 || position === 1; // Middle two of 4
                
                // Color Rotation: Pink -> White -> Yellow
                const progColors = [
                  { bg: 'bg-[#E2007B]', text: 'text-white' }, // Pink
                  { bg: 'bg-white', text: 'text-black' },      // White
                  { bg: 'bg-[#FFB800]', text: 'text-black' }, // Yellow
                ];
                const color = progColors[index % 3];

                return (
                  <motion.div
                    key={`${item.name}-${index}`}
                    initial={false}
                    animate={{
                      x: position * 380 - 190, // Centering 4 cards
                      scale: Math.abs(position - 0.5) < 1 ? 1 : 0.85,
                      opacity: isVisible ? 1 : 0,
                      zIndex: 30 - Math.abs(position - 0.5) * 10,
                    }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 260, 
                      damping: 25,
                    }}
                    className={`absolute ${color.bg} ${color.text} brutal-border p-10 brutal-shadow w-[350px] h-[500px] flex flex-col items-center justify-between text-center overflow-hidden`}
                  >
                    <div className="w-full relative">
                      <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 brutal-border text-[10px] font-black uppercase z-10">
                        {item.religion}
                      </div>
                      <span className="material-symbols-outlined mt-8 opacity-90" style={{ fontSize: '140px', fontVariationSettings: "'FILL' 1" }}>
                        {item.icon}
                      </span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <h4 className="font-headline text-3xl md:text-4xl font-black uppercase mb-2 leading-none">
                        {item.name}
                      </h4>
                      <div className={`w-16 h-1.5 ${color.text === 'text-white' ? 'bg-white' : 'bg-black'} mt-4`}></div>
                    </div>

                    <span className="font-label-bold text-xs uppercase tracking-[0.2em] opacity-70">
                      Standard Coverage
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

      <ContactSection />

      <footer className="bg-[#FFB800] font-headline font-black uppercase text-sm w-full border-t-4 border-black p-12 flex flex-col md:flex-row justify-between items-center gap-8 z-40 relative">
        <div className="text-2xl font-black text-black">
          <img src="/logo.png" className='w-40 bg-white'/>
        </div>
        
        <nav className="flex flex-wrap gap-6 justify-center">
          <a className="text-black hover:text-[#0032A0] transition-all font-label-bold" href="https://canva.link/q2ugotshzypt7j8" target='_blank'>Sponsor Deck</a>
          <a className="text-black hover:text-[#0032A0] transition-all font-label-bold" href="#contact">Contact</a>
        </nav>
      </footer>
    </div>
  );
}
