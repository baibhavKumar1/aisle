'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const CATEGORIES = ['Catering', 'Floral', 'Makeup', 'Outfit', 'Photography', 'Venue', 'Other'];

export default function PopArtForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    weddingDate: '',
    budget: 'Under ₹5L',
    categories: [] as string[],
    concern: 'Looking Tacky',
    impact: '10-20% Savings',
    notes: ''
  });

  const toggleCategory = (cat: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E2007B', '#0032A0', '#FFDF94']
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="relative bg-surface p-8 brutal-border brutal-form flex flex-col gap-4 max-w-2xl mx-auto"
      >
        <div className="text-center border-b-4 border-on-surface pb-4 mb-2">
          <h2 className="font-headline text-4xl uppercase font-black">RSVP & Waitlist</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-label-bold text-label-bold uppercase text-on-surface">Name(s)</label>
            <input
              required
              className="w-full brutal-border p-3 font-body bg-surface-container-lowest focus:bg-tertiary-fixed focus:outline-none transition-colors"
              placeholder="Rohan & Priya"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-label-bold text-label-bold uppercase text-on-surface">Email</label>
            <input
              required
              className="w-full brutal-border p-3 font-body bg-surface-container-lowest focus:bg-tertiary-fixed focus:outline-none transition-colors"
              placeholder="rohan.priya@email.com"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-label-bold text-label-bold uppercase text-on-surface">Estimated Wedding Date</label>
            <input
              required
              className="w-full brutal-border p-3 font-body bg-surface-container-lowest focus:bg-tertiary-fixed focus:outline-none transition-colors"
              type="date"
              value={formData.weddingDate}
              onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-label-bold text-label-bold uppercase text-on-surface">Overall Budget</label>
            <select
              className="w-full brutal-border p-3 font-body bg-surface-container-lowest focus:bg-tertiary-fixed focus:outline-none appearance-none"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            >
              <option>Under ₹5L</option>
              <option>₹5L - ₹15L</option>
              <option>₹15L - ₹30L</option>
              <option>₹30L+</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-label-bold text-label-bold uppercase text-on-surface">Acceptable Sponsorship Categories</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`px-2 py-2 brutal-border font-label-bold text-xs uppercase transition-all ${formData.categories.includes(cat)
                    ? 'bg-primary-container text-white translate-x-1 translate-y-1'
                    : 'bg-surface-container-high hover:bg-tertiary-fixed'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-label-bold text-label-bold uppercase text-on-surface">Biggest Concern</label>
            <select
              className="w-full brutal-border p-3 font-body bg-surface-container-lowest focus:bg-tertiary-fixed focus:outline-none appearance-none"
              value={formData.concern}
              onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
            >
              <option>Looking Tacky</option>
              <option>Brand Misalignment</option>
              <option>Privacy Concerns</option>
              <option>Guest Experience</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-label-bold text-label-bold uppercase text-on-surface">Target Sponsorship Impact</label>
            <select
              className="w-full brutal-border p-3 font-body bg-surface-container-lowest focus:bg-tertiary-fixed focus:outline-none appearance-none"
              value={formData.impact}
              onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
            >
              <option>10-20% Savings</option>
              <option>20-40% Savings</option>
              <option>Fully Sponsored</option>
              <option>Premium Upgrades Only</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-label-bold text-label-bold uppercase text-on-surface">Any specific requirements or notes?</label>
          <textarea
            className="w-full brutal-border p-3 font-body bg-surface-container-lowest focus:bg-tertiary-fixed focus:outline-none transition-colors min-h-[100px] resize-none"
            placeholder="Tell us more about your vision..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={status === 'submitting'}
          className="w-full bg-primary-container text-on-primary font-headline text-2xl uppercase py-4 brutal-border brutal-shadow transition-all mt-2 disabled:opacity-50"
        >
          {status === 'submitting' ? 'JOINING...' : 'Join the waitlist'}
        </motion.button>

        {status === 'error' && (
          <p className="text-error font-label-bold uppercase text-center mt-2">Error! Try again.</p>
        )}
      </form>

      {/* Success Modal */}
      <AnimatePresence>
        {status === 'success' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-surface brutal-border p-12 brutal-shadow max-w-lg w-full relative overflow-hidden"
            >
              {/* Decorative background for modal */}
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-[200px]">celebration</span>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center gap-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-8xl"
                >
                  🔥
                </motion.div>
                <h2 className="font-headline text-5xl font-black uppercase tracking-tighter leading-none">
                  WELCOME TO <br /><span className="text-[#E2007B]">THE SQUAD!</span>
                </h2>
                <p className="font-body text-lg">
                  Your spot in the <strong>aisle.com </strong> movement is locked. We&apos;ll be in touch to start planning your spectacle.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="bg-primary-container text-white px-10 py-4 brutal-border brutal-shadow font-headline text-xl uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  Let&apos;s Go!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
