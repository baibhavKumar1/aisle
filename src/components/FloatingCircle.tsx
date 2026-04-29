'use client';

import { motion } from 'framer-motion';

interface FloatingCircleProps {
  color?: string;
  size?: number;
  className?: string;
  delay?: number;
}

export default function FloatingCircle({ 
  color = "#0032A0", 
  size = 80, 
  className = "",
  delay = 0 
}: FloatingCircleProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <filter id="brutal-shadow-circle">
            <feOffset dx="6" dy="6" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
            <feBlend in="SourceGraphic" in2="offset" mode="normal" />
          </filter>
        </defs>
        <motion.circle
          cx="45" cy="45" r="40"
          fill={color}
          stroke="black"
          strokeWidth="4"
          filter="url(#brutal-shadow-circle)"
          animate={{ 
            y: [0, -20, 0], 
            rotate: [0, 5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 3 + Math.random(), 
            repeat: Infinity, 
            ease: "easeInOut",
            delay 
          }}
        />
      </svg>
    </div>
  );
}
