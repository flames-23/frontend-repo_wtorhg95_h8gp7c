import React from 'react'
import { motion } from 'framer-motion'

const logos = [
  { name: 'Valorant', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Valorant_logo_-_pink_color_version.svg' },
  { name: 'CS2', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Counter-Strike_2_logo.svg' },
  { name: 'Fortnite', url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/FortniteLogo.svg' },
]

export default function AnimatedLogos() {
  return (
    <div className="grid grid-cols-3 gap-6 md:gap-10 items-center">
      {logos.map((logo, i) => (
        <motion.div
          key={logo.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: i * 0.15, type: 'spring', stiffness: 120 }}
          className="p-4 md:p-6 rounded-lg bg-[#0A0A0A]/60 border-2 border-[#39FF14]/60 hover:border-[#39FF14] shadow-[0_0_25px_rgba(57,255,20,0.35)_inset] hover:shadow-[0_0_35px_rgba(57,255,20,0.6)_inset] group"
        >
          <motion.img
            src={logo.url}
            alt={`${logo.name} logo`}
            className="w-full h-12 md:h-16 object-contain drop-shadow-[0_0_10px_rgba(57,255,20,0.6)]"
            whileHover={{ rotate: 5, scale: 1.05, filter: 'drop-shadow(0 0 25px rgba(57,255,20,0.9))' }}
          />
        </motion.div>
      ))}
    </div>
  )
}
