import React, { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import GlitchText from './components/GlitchText'
import NeonButton from './components/NeonButton'
import AnimatedLogos from './components/AnimatedLogos'
import ParticleField from './components/ParticleField'

function useTilt() {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useTransform(y, [0, 1], [12, -12])
  const ry = useTransform(x, [0, 1], [-12, 12])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      x.set(px)
      y.set(py)
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', () => { x.set(0.5); y.set(0.5) })
    return () => {
      el.removeEventListener('mousemove', onMove)
    }
  }, [x, y])

  return { ref, rx, ry }
}

function Section({ children, className = '' }) {
  return (
    <section className={`relative py-20 md:py-28 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A] to-[#0A0A0A] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">{children}</div>
    </section>
  )
}

export default function App() {
  const { ref, rx, ry } = useTilt()

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-white overflow-x-hidden">
      {/* Hero with Spline 3D scene */}
      <div className="relative h-[90vh] w-full">
        <Spline scene="https://prod.spline.design/BL9Cjn3fkAdLBhXm/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <ParticleField density={120} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/20 to-[#0A0A0A] pointer-events-none" />

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <GlitchText text="APEX SCRIPTS" className="text-5xl md:text-7xl font-extrabold tracking-wider text-[#39FF14] drop-shadow-[0_0_30px_rgba(57,255,20,0.75)]" />
            <p className="mt-6 max-w-2xl text-[#D1FFD6]/90">
              Cyberpunk marketplace for game mods, scripts, and tools. Built with a neon green matrix aesthetic, heavy animations, and interactive 3D.
            </p>
            <div className="mt-8 flex gap-4">
              <NeonButton>Explore Scripts</NeonButton>
              <NeonButton className="!bg-[#121212]">Join Community</NeonButton>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling marquee like glow border */}
      <div className="relative py-3 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-[200%] animate-[marquee_18s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(57,255,20,0.25),transparent)]" />
        </div>
      </div>

      {/* Feature grid with heavy hover tilt and parallax */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          {["Aimbot Modules","ESP/Wallhack","Automation Bots"].map((t, i) => (
            <motion.div
              key={t}
              ref={i === 0 ? ref : undefined}
              style={i===0?{ rotateX: rx, rotateY: ry }:undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className="relative p-6 rounded-xl bg-[#0A0A0A]/70 border-2 border-[#39FF14]/60 hover:border-[#39FF14] shadow-[0_0_30px_rgba(57,255,20,0.35)_inset] hover:shadow-[0_0_45px_rgba(57,255,20,0.6)_inset] group"
            >
              <h3 className="text-xl font-bold text-[#39FF14] drop-shadow-[0_0_12px_rgba(57,255,20,0.8)]">{t}</h3>
              <p className="mt-3 text-white/80">High-performance modules with anti-detection techniques and live updates.</p>
              <motion.div
                className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#39FF14]/10 blur-2xl"
                animate={{ x: [0, 6, 0], y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Brand/game logos with interactive effects */}
      <Section>
        <GlitchText text="Supported Games" className="text-3xl md:text-4xl mb-8 text-[#39FF14]" />
        <AnimatedLogos />
      </Section>

      {/* Call to action */}
      <Section className="pb-28">
        <div className="relative p-8 md:p-12 rounded-2xl border-2 border-[#39FF14] bg-gradient-to-br from-[#0A0A0A] to-[#121212] shadow-[0_0_45px_rgba(57,255,20,0.35)_inset]">
          <GlitchText text="Join The Network" className="text-3xl md:text-5xl" />
          <p className="mt-4 text-white/85 max-w-2xl">Become part of APEX SCRIPTS community. Get early access, exclusive drops, and support.</p>
          <div className="mt-6">
            <NeonButton>Get Started</NeonButton>
          </div>
        </div>
      </Section>

      <footer className="relative py-10 border-t-2 border-[#39FF14]/40">
        <div className="container mx-auto px-6 flex justify-between items-center text-white/70">
          <span>© {new Date().getFullYear()} APEX SCRIPTS</span>
          <span className="text-[#39FF14]">Neon Powered</span>
        </div>
      </footer>

      {/* Cursor glow trail */}
      <div id="cursor-trail" className="pointer-events-none fixed inset-0" />
    </div>
  )
}
