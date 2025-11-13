import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar(){
  const { pathname } = useLocation()
  const base = 'text-white/80 hover:text-[#39FF14] transition-colors'
  const active = 'text-[#39FF14]'
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-[#39FF14]/20 bg-black/40">
      <div className="container mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="font-extrabold tracking-widest text-[#39FF14]">APEX SCRIPTS</Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/hardware" className={`${base} ${pathname==='/hardware'?active:''}`}>Hardware</Link>
          <Link to="/licenses" className={`${base} ${pathname==='/licenses'?active:''}`}>Licenses</Link>
        </nav>
      </div>
    </header>
  )
}
