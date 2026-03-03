import React, { useEffect, useRef } from 'react'

const NODE_COLORS_DARK = [
    [0, 212, 255],   // cyan
    [168, 85, 247],  // purple
    [6, 255, 165],   // green
    [249, 115, 22],  // orange
    [236, 72, 153],  // pink
]

const NODE_COLORS_LIGHT = [
    [0, 119, 204],   // blue
    [124, 58, 237],  // purple
    [5, 150, 105],   // green
    [234, 107, 0],   // orange
    [219, 39, 119],  // pink
]

export default function NeuralBackground() {
    const canvasRef = useRef(null)
    const animRef = useRef(null)
    const stateRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const getColors = () => {
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
            return isDark ? NODE_COLORS_DARK : NODE_COLORS_LIGHT
        }

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
            buildNodes()
        }

        function buildNodes() {
            const COUNT = Math.min(60, Math.floor((canvas.width * canvas.height) / 14000))
            stateRef.current = Array.from({ length: COUNT }, (_, i) => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                r: Math.random() * 2.2 + 0.8,
                pulse: Math.random() * Math.PI * 2,
                ci: i % NODE_COLORS_DARK.length,
            }))
        }

        resize()
        window.addEventListener('resize', resize)

        const LINK = 165
        const LINK2 = LINK * LINK

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const nodes = stateRef.current
            if (!nodes) { animRef.current = requestAnimationFrame(draw); return }

            const colors = getColors()
            const isLight = document.documentElement.getAttribute('data-theme') === 'light'
            const alphaMultiplier = isLight ? 0.6 : 1.0

            const len = nodes.length

            // Update positions
            for (let i = 0; i < len; i++) {
                const n = nodes[i]
                n.x += n.vx; n.y += n.vy; n.pulse += 0.022
                if (n.x < 0 || n.x > canvas.width) n.vx *= -1
                if (n.y < 0 || n.y > canvas.height) n.vy *= -1
            }

            // Connections
            for (let i = 0; i < len; i++) {
                for (let j = i + 1; j < len; j++) {
                    const dx = nodes[i].x - nodes[j].x
                    const dy = nodes[i].y - nodes[j].y
                    const d2 = dx * dx + dy * dy
                    if (d2 < LINK2) {
                        const t = 1 - Math.sqrt(d2) / LINK
                        const [r, g, b] = colors[nodes[i].ci]
                        ctx.beginPath()
                        ctx.moveTo(nodes[i].x, nodes[i].y)
                        ctx.lineTo(nodes[j].x, nodes[j].y)
                        ctx.strokeStyle = `rgba(${r},${g},${b},${t * 0.38 * alphaMultiplier})`
                        ctx.lineWidth = t * 1.2
                        ctx.stroke()
                    }
                }
            }

            // Nodes
            for (let i = 0; i < len; i++) {
                const n = nodes[i]
                const p = 0.5 + 0.5 * Math.sin(n.pulse)
                const [r, g, b] = colors[n.ci]
                const radius = n.r * (0.85 + 0.3 * p)

                // Halo
                const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 5)
                grad.addColorStop(0, `rgba(${r},${g},${b},${0.35 * p * alphaMultiplier})`)
                grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
                ctx.beginPath()
                ctx.arc(n.x, n.y, radius * 5, 0, Math.PI * 2)
                ctx.fillStyle = grad
                ctx.fill()

                // Core
                ctx.beginPath()
                ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgb(${r},${g},${b})`
                ctx.shadowBlur = 10
                ctx.shadowColor = `rgba(${r},${g},${b},${0.8 * alphaMultiplier})`
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
                opacity: 0.6, pointerEvents: 'none', display: 'block',
            }}
            aria-hidden="true"
        />
    )
}
