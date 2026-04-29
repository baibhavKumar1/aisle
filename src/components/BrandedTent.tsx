'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

export const BrandedTent = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [confetti, setConfetti] = useState<{id: number, left: string, duration: number, delay: number, xOffset: number}[]>([]);

  useEffect(() => {
    setIsMounted(true);
    setConfetti(Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 5,
      delay: i * 0.5,
      xOffset: Math.sin(i) * 100
    })));
  }, []);

  // Animation variants for the warm interior glow
  const glowVariants: Variants = {
    animate: {
      opacity: [0.4, 0.7, 0.4],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  // Variants for fairy lights twinkling
  const lightVariants: Variants = {
    animate: (i: number) => ({
      opacity: [0.2, 1, 0.2],
      transition: { duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }
    })
  };

  if (!isMounted) return <div className="w-full h-[500px] bg-transparent" />;

  return (
    <div className="w-full max-w-[800px] mx-auto overflow-hidden rounded-3xl relative bg-gradient-to-b from-blue-50/50 to-amber-50/30 p-8 shadow-2xl border border-amber-100/50">
      <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
        <defs>
          <linearGradient id="fabricGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fdf2e9" />
          </linearGradient>
          <radialGradient id="interiorGlow" cx="50%" cy="70%" r="50%">
            <stop offset="0%" stopColor="#fdc34d" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fdc34d" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e9f5db" />
            <stop offset="100%" stopColor="#cfdbbd" />
          </linearGradient>
        </defs>

        {/* Ground/Grass */}
        <path d="M 0 450 Q 400 420 800 450 L 800 500 L 0 500 Z" fill="url(#grassGrad)" />

        {/* Tent Shadow on Ground */}
        <ellipse cx="400" cy="450" rx="300" ry="30" fill="rgba(0,0,0,0.05)" />

        {/* TENT STRUCTURE */}
        <g transform="translate(0, -20)">
          {/* Main Back Fabric (The Glow Inside) */}
          <motion.path 
            variants={glowVariants}
            animate="animate"
            d="M 150 450 L 250 150 Q 400 100 550 150 L 650 450 Z" 
            fill="url(#interiorGlow)" 
          />

          {/* Central Peak Fabric */}
          <motion.path 
            animate={{
              d: [
                "M 200 450 L 400 80 L 600 450 Z",
                "M 200 450 L 402 82 L 600 450 Z",
                "M 200 450 L 400 80 L 600 450 Z"
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            fill="url(#fabricGrad)" 
            stroke="#e1bfb9" 
            strokeWidth="1"
          />

          {/* Left Wing */}
          <path d="M 100 450 L 250 150 L 400 80 L 200 450 Z" fill="#fff" opacity="0.9" stroke="#e1bfb9" strokeWidth="1" />
          
          {/* Right Wing */}
          <path d="M 700 450 L 550 150 L 400 80 L 600 450 Z" fill="#fff" opacity="0.9" stroke="#e1bfb9" strokeWidth="1" />

          {/* Valance (Decorative edge) */}
          <path d="M 220 400 Q 250 410 280 400 Q 310 410 340 400 Q 370 410 400 400 Q 430 410 460 400 Q 490 410 520 400 Q 550 410 580 400" 
            fill="none" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" />

          {/* PEAK FLAG WITH LOGO */}
          <motion.g 
            animate={{ rotate: [-2, 2, -2] }} 
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: '400px', originY: '80px' }}
          >
            <line x1="400" y1="80" x2="400" y2="30" stroke="#7d5c00" strokeWidth="2" />
            <path d="M 400 30 L 460 45 L 400 60 Z" fill="#d4af37" />
            {/* Tiny Logo Initials on Flag */}
            <text x="408" y="50" fill="white" fontSize="10" fontWeight="bold" fontFamily="serif">SS</text>
          </motion.g>

          {/* ENTRANCE DECOR - PEDESTAL WITH QR */}
          <g transform="translate(480, 360)">
            {/* Elegant Stand */}
            <rect x="0" y="0" width="40" height="90" fill="#fff9f0" stroke="#d4af37" rx="4" />
            <rect x="-5" y="0" width="50" height="10" fill="#d4af37" rx="2" />
            
            {/* The QR Board */}
            <g transform="translate(5, 15)">
              <rect x="0" y="0" width="30" height="30" fill="white" stroke="#1a1a1a" strokeWidth="0.5" />
              {/* QR Pattern Simplified */}
              <rect x="2" y="2" width="8" height="8" fill="#1a1a1a" />
              <rect x="20" y="2" width="8" height="8" fill="#1a1a1a" />
              <rect x="2" y="20" width="8" height="8" fill="#1a1a1a" />
              {[...Array(10)].map((_, i) => (
                <rect key={i} x={12 + (i % 3) * 4} y={12 + Math.floor(i / 3) * 4} width="2" height="2" fill="#1a1a1a" />
              ))}
            </g>
            <text x="20" y="55" textAnchor="middle" fontSize="5" fill="#7d5c00" fontWeight="bold">SCAN TO</text>
            <text x="20" y="62" textAnchor="middle" fontSize="5" fill="#7d5c00" fontWeight="bold">VIEW MENU</text>
          </g>

          {/* CHANDELIER SILHOUETTE INSIDE */}
          <g transform="translate(400, 160)" opacity="0.4">
            <circle cx="0" cy="0" r="2" fill="#fdc34d" />
            <path d="M -20 10 Q 0 30 20 10" fill="none" stroke="#fdc34d" strokeWidth="1" />
            <path d="M -30 20 Q 0 50 30 20" fill="none" stroke="#fdc34d" strokeWidth="1" />
          </g>

          {/* FAIRY LIGHTS STRING */}
          <path d="M 100 450 Q 250 150 400 80 Q 550 150 700 450" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2 10" />
          {[...Array(20)].map((_, i) => {
            // Positioning lights along the tent curve roughly
            const x = 150 + i * 25;
            const y = 450 - Math.sin((i / 20) * Math.PI) * 350;
            return (
              <motion.circle 
                key={i} 
                cx={x} 
                cy={y} 
                r="2" 
                fill="#fff" 
                custom={i}
                variants={lightVariants}
                animate="animate"
                style={{ filter: 'blur(1px)' }}
              />
            );
          })}
        </g>

        {/* Logo Text on the grass (Large Branding) */}
        <text x="400" y="480" textAnchor="middle" className="font-serif text-[24px] fill-[#7d5c00] font-bold tracking-[0.2em] opacity-80">
          SHAADI SAATHI
        </text>
      </svg>

      {/* Floating Petals/Confetti for "Wedding Atmosphere" */}
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="absolute w-2 h-2 bg-rose-200 rounded-full opacity-40"
          animate={{
            y: [0, 500],
            x: [0, c.xOffset],
            rotate: [0, 360],
          }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            delay: c.delay,
            ease: "linear"
          }}
          style={{
            left: c.left,
            top: -20,
          }}
        />
      ))}
    </div>
  );
};
