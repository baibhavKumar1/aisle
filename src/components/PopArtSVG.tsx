'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PopArtSVG() {
  const [dots, setDots] = useState<{id: number, cx: number, cy: number, delay: number}[]>([]);

  useEffect(() => {
    setDots(Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      cx: Math.random() * 500,
      cy: Math.random() * 500,
      delay: Math.random() * 2
    })));
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative overflow-hidden">
      <svg viewBox="0 0 500 500" className="w-full h-full max-w-[700px]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="brutal-shadow-svg">
            <feOffset dx="7" dy="7" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
            <feBlend in="SourceGraphic" in2="offset" mode="normal" />
          </filter>
        </defs>

        {/* Rotating Sunburst Rays */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '250px 250px' }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d="M 250 250 L 500 150 L 500 350 Z"
              fill={i % 2 === 0 ? "#FFB800" : "#E2007B"}
              transform={`rotate(${i * 30} 250 250)`}
              className="opacity-20"
            />
          ))}
        </motion.g>

        {/* Floating Circles */}
        {/* <motion.circle
          cx="100" cy="100" r="40"
          fill="#0032A0"
          stroke="black"
          strokeWidth="4"
          filter="url(#brutal-shadow-svg)"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        /> */}
      </svg>
    </div>
  );
}
