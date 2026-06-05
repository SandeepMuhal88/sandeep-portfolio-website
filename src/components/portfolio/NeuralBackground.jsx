import React, { useEffect, useRef } from 'react'

// Deep Space Neon Palette — violet / cyan / pink
const NODE_COLORS_DARK = [
    [124, 58, 237],   // deep violet    (#7c3aed)
    [167, 139, 250],  // violet-400     (#a78bfa)
    [6, 182, 212],    // cyan           (#06b6d4)
    [236, 72, 153],   // neon pink      (#ec4899)
    [16, 185, 129],   // emerald        (#10b981)
    [217, 70, 239],   // fuchsia        (#d946ef)
    [245, 158, 11],   // amber          (#f59e0b)
]

const NODE_COLORS_LIGHT = [
    [109, 40, 217],   // violet-700
    [8, 145, 178],    // cyan-600
    [5, 150, 105],    // emerald-600
    [157, 23, 77],    // pink-800
    [139, 92, 246],   // violet-500
]

export default function NeuralBackground() {
    const canvasRef = useRef(null)
    const animRef   = useRef(null)
    const stateRef  = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const getColors = () => {
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
            return isDark ? NODE_COLORS_DARK : NODE_COLORS_LIGHT
        }

        const resize = () => {
            canvas.width  = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
            buildNodes()
        }

        function buildNodes() {
            // More nodes for a denser, premium look
            const COUNT = Math.min(75, Math.floor((canvas.width * canvas.height) / 11000))
            stateRef.current = Array.from({ length: COUNT }, (_, i) => ({
                x:     Math.random() * canvas.width,
                y:     Math.random() * canvas.height,
                vx:    (Math.random() - 0.5) * 0.38,
                vy:    (Math.random() - 0.5) * 0.38,
                r:     Math.random() * 2.4 + 0.9,
                pulse: Math.random() * Math.PI * 2,
                ci:    i % NODE_COLORS_DARK.length,
                // Data particles occasionally get a "data flow" direction
                flow:  Math.random() > 0.7,
            }))
        }

        resize()
        window.addEventListener('resize', resize)

        const LINK  = 175
        const LINK2 = LINK * LINK

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const nodes = stateRef.current
            if (!nodes) { animRef.current = requestAnimationFrame(draw); return }

            const colors = getColors()
            const isLight = document.documentElement.getAttribute('data-theme') === 'light'
            const alphaM  = isLight ? 0.55 : 1.0

            const len = nodes.length

            // Update positions
            for (let i = 0; i < len; i++) {
                const n = nodes[i]
                n.x += n.vx; n.y += n.vy; n.pulse += 0.018
                if (n.x < 0 || n.x > canvas.width)  n.vx *= -1
                if (n.y < 0 || n.y > canvas.height)  n.vy *= -1
            }

            // Connections — gradient lines for premium feel
            for (let i = 0; i < len; i++) {
                for (let j = i + 1; j < len; j++) {
                    const dx = nodes[i].x - nodes[j].x
                    const dy = nodes[i].y - nodes[j].y
                    const d2 = dx * dx + dy * dy
                    if (d2 < LINK2) {
                        const t = 1 - Math.sqrt(d2) / LINK
                        const [r1, g1, b1] = colors[nodes[i].ci]
                        const [r2, g2, b2] = colors[nodes[j].ci]

                        // Gradient line between two node colors
                        const grad = ctx.createLinearGradient(
                            nodes[i].x, nodes[i].y,
                            nodes[j].x, nodes[j].y
                        )
                        grad.addColorStop(0, `rgba(${r1},${g1},${b1},${t * 0.42 * alphaM})`)
                        grad.addColorStop(1, `rgba(${r2},${g2},${b2},${t * 0.25 * alphaM})`)

                        ctx.beginPath()
                        ctx.moveTo(nodes[i].x, nodes[i].y)
                        ctx.lineTo(nodes[j].x, nodes[j].y)
                        ctx.strokeStyle = grad
                        ctx.lineWidth   = t * 1.4
                        ctx.stroke()
                    }
                }
            }

            // Nodes — with glowing halos
            for (let i = 0; i < len; i++) {
                const n = nodes[i]
                const p = 0.5 + 0.5 * Math.sin(n.pulse)
                const [r, g, b] = colors[n.ci]
                const radius    = n.r * (0.82 + 0.32 * p)

                // Outer halo (double layer for premium glow)
                const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 7)
                halo.addColorStop(0, `rgba(${r},${g},${b},${0.28 * p * alphaM})`)
                halo.addColorStop(0.5, `rgba(${r},${g},${b},${0.10 * p * alphaM})`)
                halo.addColorStop(1, `rgba(${r},${g},${b},0)`)
                ctx.beginPath()
                ctx.arc(n.x, n.y, radius * 7, 0, Math.PI * 2)
                ctx.fillStyle = halo
                ctx.fill()

                // Inner bright core
                ctx.beginPath()
                ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
                ctx.fillStyle  = `rgba(${r},${g},${b},${0.9 * alphaM})`
                ctx.shadowBlur = 14
                ctx.shadowColor = `rgba(${r},${g},${b},${0.9 * alphaM})`
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
            style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                opacity: 0.55, pointerEvents: 'none', display: 'block',
            }}
            aria-hidden="true"
        />
    )
}
