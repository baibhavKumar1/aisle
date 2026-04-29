'use client';

import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#0032A0] py-24 px-margin-mobile md:px-margin-desktop border-y-4 border-black relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-80 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E2007B]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"></div>

      <div className="max-w-8xl mx-auto space-y-20 relative z-10">
        

        {/* Get In Touch */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 z-0"></div>
          <div className="relative bg-[#F3F0EF] brutal-border p-8 md:p-16 z-10 flex flex-col lg:flex-row justify-between gap-12 shadow-2xl">
            <div className="flex flex-col gap-10 lg:w-1/2">
              <div className="space-y-2">
                <h2 className="font-headline text-5xl md:text-6xl font-black uppercase text-[#0032A0] tracking-tighter">GET IN TOUCH</h2>
                <div className="w-24 h-4 bg-[#E2007B] brutal-border"></div>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-[#E2007B] p-2 brutal-border">
                    <span className="material-symbols-outlined text-white">person</span>
                  </div>
                  <div>
                    <p className="font-headline text-3xl font-black text-black leading-none uppercase tracking-tighter">Aryan / Baibhav</p>
                    <p className="font-label-bold text-sm uppercase text-[#E2007B] font-bold mt-1">FOUNDER, THE AISLE</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-[#0032A0] p-2 brutal-border">
                    <span className="material-symbols-outlined text-white">smartphone</span>
                  </div>
                  <div className="font-headline text-2xl font-bold text-black tracking-tight">
                    <p>+91 9649699400</p>
                    <p>+91 9315195961</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 flex items-center justify-center lg:justify-end">
               <div className="relative w-full">
                  <div className="absolute -top-8 -left-8 z-20">
                    <span className="material-symbols-outlined text-black bg-[#FFDF94] p-3 brutal-border" style={{ fontSize: '40px' }}>format_quote</span>
                  </div>
                  <div className="brutal-border p-8 md:p-10 bg-white brutal-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#E2007B]/5 -mr-10 -mt-10 rounded-full"></div>
                    <p className="font-body text-xl md:text-2xl italic text-black font-medium leading-relaxed relative z-10">
                      &quot;This is a new idea, a new project, an innovation type of thing, but if you consider sponsoring hoardings, concerts, think about this too, or share your feedback.&quot;
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
