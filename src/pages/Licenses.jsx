import React, { useEffect, useState } from 'react'
import GlitchText from '../components/GlitchText'
import ProductGrid from '../components/ProductGrid'

const API_BASE = import.meta.env.VITE_BACKEND_URL || window.location.origin.replace('3000','8000')

export default function Licenses() {
  const [games, setGames] = useState([])
  const [active, setActive] = useState('all')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products/licenses/games`)
        const data = await res.json()
        setGames(data)
      } catch {}
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-6 py-16">
        <GlitchText text="Licenses" className="text-4xl text-[#39FF14] mb-6" />
        <p className="text-white/80 mb-8">Choose your game and duration. Instant delivery after checkout.</p>
        <div className="flex gap-3 flex-wrap mb-10">
          <button onClick={() => setActive('all')} className={`px-3 py-1.5 rounded-md border ${active==='all'?'border-[#39FF14] bg-[#39FF14]/10':'border-[#39FF14]/40'} text-sm`}>All</button>
          {games.map(g => (
            <button key={g} onClick={() => setActive(g)} className={`px-3 py-1.5 rounded-md border ${active===g?'border-[#39FF14] bg-[#39FF14]/10':'border-[#39FF14]/40'} text-sm uppercase`}>{g}</button>
          ))}
        </div>
        <ProductGrid type="licenses" game={active==='all'? null : active} />
      </div>
    </div>
  )
}
