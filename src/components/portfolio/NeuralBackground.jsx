import React, { useEffect, useRef } from 'react'

// Pure white / gray monochrome nodes
const NODE_COLORS = [
  [255, 255, 255],  // pure white
  [220, 220, 220],  // light gray
  [180, 180, 180],  // medium gray
  [255, 255, 255],  // white
  [200, 200, 200],  // soft gray
]

export default function NeuralBackground() {
  const canvasRef = useRef(null)
  const animRef   = useRef(null)
  const stateRef  = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      buildNodes()
    }

    function buildNodes() {
      const COUNT = Math.min(55, Math.floor((canvas.width * canvas.height) / 14000))
      stateRef.current = Array.from({ length: COUNT }, (_, i) => ({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    (Math.random() - 0.5) * 0.28,
        vy:    (Math.random() - 0.5) * 0.28,
        r:     Math.random() * 1.6 + 0.6,
        pulse: Math.random() * Math.PI * 2,
        ci:    i % NODE_COLORS.length,
      }))
    }

    resize()
    window.addEventListener('resize', resize)

    const LINK  = 160
    const LINK2 = LINK * LINK

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const nodes = stateRef.current
      if (!nodes) { animRef.current = requestAnimationFrame(draw); return }

      const len = nodes.length

      // Move nodes
      for (let i = 0; i < len; i++) {
        const n = nodes[i]
        n.x += n.vx; n.y += n.vy; n.pulse += 0.016
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      }

      // Connection lines
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK2) {
            const t = 1 - Math.sqrt(d2) / LINK
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${t * 0.18})`
            ctx.lineWidth = t * 0.8
            ctx.stroke()
          }
        }
      }

      // Nodes
      for (let i = 0; i < len; i++) {
        const n = nodes[i]
        const p = 0.5 + 0.5 * Math.sin(n.pulse)
        const radius = n.r * (0.85 + 0.25 * p)

        // Halo
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 5)
        halo.addColorStop(0, `rgba(255,255,255,${0.12 * p})`)
        halo.addColorStop(1, `rgba(255,255,255,0)`)
        ctx.beginPath()
        ctx.arc(n.x, n.y, radius * 5, 0, Math.PI * 2)
        ctx.fillStyle = halo
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${0.7 * p})`
        ctx.shadowBlur = 6
        ctx.shadowColor = `rgba(255,255,255,0.5)`
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="neural-bg"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity: 0.28, pointerEvents: 'none', display: 'block',
      }}
      aria-hidden="true"
    />
  )
}
