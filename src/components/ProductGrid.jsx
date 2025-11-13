import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || window.location.origin.replace('3000','8000')

function ProductCard({ item }) {
  return (
    <div className="relative p-4 rounded-xl bg-[#0A0A0A]/70 border-2 border-[#39FF14]/40 hover:border-[#39FF14] transition-colors shadow-[0_0_24px_rgba(57,255,20,0.25)_inset]">
      <div className="aspect-video rounded-lg bg-[#121212] mb-3 overflow-hidden border border-[#39FF14]/20">
        {item.images?.length ? (
          <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-[#39FF14]/70 text-xs">NO IMAGE</div>
        )}
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-white font-semibold leading-tight">{item.title}</h4>
          {item.game && <p className="text-xs text-[#39FF14]/80 mt-1 uppercase">{item.game}</p>}
        </div>
        <div className="text-right">
          <div className="text-[#39FF14] font-bold">${Number(item.price).toFixed(2)}</div>
          {item.duration_days && (
            <div className="text-[10px] text-white/60">{item.duration_days} days</div>
          )}
        </div>
      </div>
      {item.delivery_info && (
        <p className="text-xs text-white/70 mt-2">{item.delivery_info}</p>
      )}
      <button className="mt-3 w-full py-2 rounded-md bg-[#39FF14] text-black font-semibold hover:opacity-90">
        View
      </button>
    </div>
  )}

export default function ProductGrid({ type = 'hardware', game = null }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        let url = `${API_BASE}/api/products/${type}`
        const params = []
        if (type === 'licenses' && game) params.push(`game=${encodeURIComponent(game)}`)
        if (params.length) url += `?${params.join('&')}`
        const res = await fetch(url)
        const data = await res.json()
        setItems(Array.isArray(data) ? data : [])
      } catch (e) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [type, game])

  if (loading) return <div className="text-white/70">Loading {type}...</div>
  if (error) return <div className="text-red-400">{error}</div>

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
      {!items.length && (
        <div className="col-span-full text-white/60">No items found.</div>
      )}
    </div>
  )
}
