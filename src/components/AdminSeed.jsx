import React, { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || window.location.origin.replace('3000','8000')

export default function AdminSeed({ onDone }) {
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  const addItems = async () => {
    setBusy(true)
    setMsg('')
    const items = [
      { title: 'Rainbow Six License 30 Days', category: 'license', price: 29.99, game: 'rainbow6', duration_days: 30, images: [], delivery_info: 'Instant key delivery' },
      { title: 'CS:GO License 30 Days', category: 'license', price: 24.99, game: 'csgo', duration_days: 30, images: [], delivery_info: 'Instant key delivery' },
      { title: 'Overwatch License 30 Days', category: 'license', price: 27.99, game: 'overwatch', duration_days: 30, images: [], delivery_info: 'Instant key delivery' },
      { title: 'FiveM License 30 Days', category: 'license', price: 19.99, game: 'fivem', duration_days: 30, images: [], delivery_info: 'Instant key delivery' },
      { title: 'VMP (FiveM) License 30 Days', category: 'license', price: 22.99, game: 'fivem', duration_days: 30, images: [], delivery_info: 'Instant key delivery' },
      { title: 'Arduino Uno R3', category: 'hardware', price: 14.99, images: [], delivery_info: 'Ships in 24h. Includes USB cable.' },
    ]

    let ok = 0
    for (const it of items) {
      try {
        const res = await fetch(`${API_BASE}/api/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(it),
        })
        if (res.ok) ok++
      } catch {}
    }
    setMsg(`Added ${ok}/${items.length} items`)
    setBusy(false)
    onDone?.()
  }

  return (
    <div className="flex items-center gap-3 mb-6">
      <button onClick={addItems} disabled={busy} className="px-3 py-1.5 rounded-md border border-[#39FF14]/50 text-xs hover:bg-[#39FF14]/10 disabled:opacity-50">
        {busy ? 'Seeding…' : 'Add demo items'}
      </button>
      {msg && <span className="text-xs text-white/60">{msg}</span>}
    </div>
  )
}
