'use client'
import { useEffect, useRef, useState } from 'react'
import { usePrefs } from '@/context/PreferencesContext'

/**
 * Custom cursors for mouse/trackpad users.
 * - "ring": a bronze dot plus a trailing ring that grows over links and shows a label
 *   for any element marked data-cursor="View" (or any short word).
 * - "spotlight": a soft bronze glow that follows the pointer.
 * - "system": the normal OS cursor.
 * Touch devices and reduced-motion users always get the system cursor.
 */
export function CustomCursor() {
  const { cursor } = usePrefs()
  const [enabled, setEnabled] = useState(false)
  const dotLayer = useRef<HTMLDivElement>(null)
  const ringLayer = useRef<HTMLDivElement>(null)
  const ringEl = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const spotLayer = useRef<HTMLDivElement>(null)
  const spotEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(fine.matches && !calm.matches)
    update()
    fine.addEventListener('change', update)
    calm.addEventListener('change', update)
    return () => { fine.removeEventListener('change', update); calm.removeEventListener('change', update) }
  }, [])

  const mode = enabled ? cursor : 'system'

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('cursor-ring', 'cursor-spotlight')
    if (mode === 'system') return
    root.classList.add(mode === 'ring' ? 'cursor-ring' : 'cursor-spotlight')

    let x = -100, y = -100, rx = -100, ry = -100, frame = 0, seen = false
    const layers = () => [dotLayer.current, ringLayer.current, spotLayer.current]
    const hide = (hidden: boolean) => layers().forEach(el => el?.classList.toggle('cursor-hidden', hidden))
    hide(true)

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX; y = e.clientY
      if (!seen) { rx = x; ry = y; seen = true }
      hide(false)
      if (dotLayer.current) dotLayer.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      const target = e.target instanceof Element ? e.target : null
      const labelled = target?.closest<HTMLElement>('[data-cursor]')
      const interactive = target?.closest('a, button, [role="button"], label, summary, [data-cursor]')
      const typing = target?.closest('input, textarea, select, [contenteditable]')
      ringEl.current?.classList.toggle('is-hover', Boolean(interactive) && !labelled)
      ringEl.current?.classList.toggle('is-label', Boolean(labelled))
      ringEl.current?.classList.toggle('is-text', Boolean(typing))
      dotLayer.current?.classList.toggle('cursor-hidden', Boolean(typing) || Boolean(labelled))
      spotEl.current?.classList.toggle('is-hover', Boolean(interactive))
      if (label.current) label.current.textContent = labelled?.dataset.cursor ?? ''
    }
    const loop = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      const transform = `translate3d(${rx}px, ${ry}px, 0)`
      if (ringLayer.current) ringLayer.current.style.transform = transform
      if (spotLayer.current) spotLayer.current.style.transform = transform
      frame = requestAnimationFrame(loop)
    }
    const onDown = () => ringEl.current?.classList.add('is-down')
    const onUp = () => ringEl.current?.classList.remove('is-down')
    const onLeave = () => hide(true)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('pointerleave', onLeave)
    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      root.classList.remove('cursor-ring', 'cursor-spotlight')
    }
  }, [mode])

  if (mode === 'system') return null
  return <div aria-hidden="true">
    {mode === 'ring' && <>
      <div ref={ringLayer} className="cursor-layer"><div ref={ringEl} className="cursor-ring-el"><span ref={label} /></div></div>
      <div ref={dotLayer} className="cursor-layer"><div className="cursor-dot" /></div>
    </>}
    {mode === 'spotlight' && <div ref={spotLayer} className="cursor-layer"><div ref={spotEl} className="cursor-spot" /></div>}
  </div>
}
