import React, { useEffect, useRef } from 'react'

// Simple canvas particle/code rain hybrid
export default function ParticleField({ density = 90 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: density }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.8,
      vy: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      a: Math.random() * Math.PI * 2,
    }))

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // grid glow
      ctx.strokeStyle = 'rgba(57,255,20,0.08)'
      ctx.lineWidth = 1
      const grid = 40
      for (let x = 0; x < canvas.width; x += grid) {
        ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += grid) {
        ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(canvas.width, y + 0.5); ctx.stroke()
      }

      particles.forEach(p => {
        p.y += p.vy
        p.x += Math.sin(p.a += 0.02) * 0.3 + p.vx
        if (p.y > canvas.height + 5) p.y = -5
        if (p.x > canvas.width + 5) p.x = -5
        if (p.x < -5) p.x = canvas.width + 5

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6)
        g.addColorStop(0, 'rgba(57,255,20,0.9)')
        g.addColorStop(1, 'rgba(57,255,20,0)')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      })

      // scanline
      const t = Date.now() * 0.001
      const y = (t % 2) / 2 * canvas.height
      const grad = ctx.createLinearGradient(0, y, 0, y + 80)
      grad.addColorStop(0, 'rgba(57,255,20,0)')
      grad.addColorStop(0.5, 'rgba(57,255,20,0.12)')
      grad.addColorStop(1, 'rgba(57,255,20,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, y, canvas.width, 80)

      animationId = requestAnimationFrame(step)
    }
    step()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [density])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}
