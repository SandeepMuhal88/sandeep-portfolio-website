import { useEffect, useRef, useState } from 'react'

// Single shared IntersectionObserver for scroll-reveal performance
let observer = null
const callbacks = new Map()

function getObserver() {
    if (!observer) {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const cb = callbacks.get(entry.target)
                    if (cb) cb(entry.isIntersecting)
                })
            },
            { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
        )
    }
    return observer
}

export function useScrollReveal() {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = getObserver()
        callbacks.set(el, (isVisible) => {
            if (isVisible) setVisible(true)
        })
        obs.observe(el)
        return () => {
            obs.unobserve(el)
            callbacks.delete(el)
        }
    }, [])

    return [ref, visible]
}

export function useCounter(target, visible, duration = 1800) {
    const [count, setCount] = useState(0)
    const hasRun = useRef(false)

    useEffect(() => {
        if (!visible || hasRun.current) return
        hasRun.current = true
        const num = parseFloat(target.replace(/[^0-9.]/g, ''))
        const suffix = target.replace(/[0-9.]/g, '')
        const step = num / (duration / 16)
        let current = 0
        const timer = setInterval(() => {
            current = Math.min(current + step, num)
            setCount(
                Number.isInteger(num)
                    ? Math.floor(current) + suffix
                    : current.toFixed(2) + suffix
            )
            if (current >= num) clearInterval(timer)
        }, 16)
        return () => clearInterval(timer)
    }, [visible, target, duration])

    return count || '0'
}
