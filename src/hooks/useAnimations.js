import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal — returns [ref, isVisible]
 * Fires once when the element enters the viewport.
 */
export function useScrollReveal(threshold = 0.15) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold])

    return [ref, visible]
}

/**
 * useCounter — animates a number from 0 to the target value
 * Accepts values like "10+", "7.93", "2+"
 */
export function useCounter(rawValue, active, duration = 1200) {
    const [display, setDisplay] = useState('0')

    useEffect(() => {
        if (!active) return

        const suffix = rawValue.replace(/[\d.]/g, '')    // e.g. "+" or ""
        const target = parseFloat(rawValue)
        const isFloat = rawValue.includes('.')
        const start = performance.now()

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)  // ease-out cubic
            const current = target * eased

            setDisplay(`${isFloat ? current.toFixed(2) : Math.floor(current)}${suffix}`)

            if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
    }, [active, rawValue, duration])

    return display
}
