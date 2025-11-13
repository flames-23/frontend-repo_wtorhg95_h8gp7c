import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import App from './App'
import Hardware from './pages/Hardware'
import Licenses from './pages/Licenses'

export default function AppShell(){
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/licenses" element={<Licenses />} />
      </Routes>
    </div>
  )
}
