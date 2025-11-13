import React, { useState } from 'react'
import GlitchText from '../components/GlitchText'
import ProductGrid from '../components/ProductGrid'
import AdminSeed from '../components/AdminSeed'

export default function Hardware() {
  const [tick, setTick] = useState(0)
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-6 py-16">
        <GlitchText text="Hardware" className="text-4xl text-[#39FF14] mb-6" />
        <p className="text-white/80 mb-6">Physical gear built for performance. Neon-lit, cyber-tuned.</p>
        <AdminSeed onDone={() => setTick(t=>t+1)} />
        <ProductGrid type="hardware" reloadAt={tick} />
      </div>
    </div>
  )
}
