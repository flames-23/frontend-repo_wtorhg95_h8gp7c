import React from 'react'
import { motion } from 'framer-motion'

export default function NeonButton({ children, onClick, className = '' }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(57,255,20,0.6)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative px-6 py-3 border-2 border-[#39FF14] text-[#39FF14] uppercase tracking-widest font-semibold bg-[#0A0A0A]/70 backdrop-blur-sm rounded-md transition-colors hover:bg-[#121212] focus:outline-none ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -z-0 rounded-md shadow-[0_0_25px_rgba(57,255,20,0.6)_inset]" />
    </motion.button>
  )
}
