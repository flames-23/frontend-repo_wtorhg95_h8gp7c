import React from 'react'
import { motion } from 'framer-motion'

// GlitchText: Cyberpunk glitchy headline with neon glow
export default function GlitchText({ text, className = '' }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75 }}
      className={`relative select-none glitch-text ${className}`}
      data-text={text}
    >
      {text}
      <span className="glow" aria-hidden="true">{text}</span>
      <span className="scanline" aria-hidden="true" />
    </motion.h1>
  )
}
