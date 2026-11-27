'use client'
import { useEffect, useRef, useState } from 'react'

/** Fades children up when they scroll into view. */
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: { children: React.ReactNode; className?: string; delay?: number; as?: 'div' | 'section' | 'li' }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('is-visible'); return }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('is-visible'); io.disconnect() }
    }, { rootMargin: '0px 0px -8% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref as never} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>{children}</Tag>
}

/** Counts from 0 to `value` once visible. Respects reduced motion. */
export function CountUp({ value, decimals = 0, duration = 1400, prefix = '', suffix = '', format }: { value: number; decimals?: number; duration?: number; prefix?: string; suffix?: string; format?: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(value)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(value); return }
    setShown(0)
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStarted(true); io.disconnect() } })
    io.observe(el)
    return () => io.disconnect()
  }, [value])

  useEffect(() => {
    if (!started) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setShown(value * eased)
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, value, duration])

  const text = format ? format(shown) : shown.toFixed(decimals)
  return <span ref={ref}>{prefix}{text}{suffix}</span>
}

/** Animated number for values that change often (e.g. result counts). */
export function AnimatedNumber({ value }: { value: number }) {
  const [shown, setShown] = useState(value)
  const from = useRef(value)
  useEffect(() => {
    const start = performance.now()
    const begin = from.current
    let frame = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 400)
      const next = Math.round(begin + (value - begin) * p)
      setShown(next)
      if (p < 1) frame = requestAnimationFrame(tick)
      else from.current = value
    }
    frame = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(frame); from.current = value }
  }, [value])
  return <>{shown.toLocaleString('en-NG')}</>
}
