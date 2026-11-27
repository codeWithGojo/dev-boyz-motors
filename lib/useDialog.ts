'use client'
import { useEffect, useRef } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Modal behaviour for an open dialog: moves focus inside, keeps Tab inside,
 * closes on Escape, locks page scroll, and returns focus when it closes.
 */
export function useDialog<T extends HTMLElement>(open: boolean, onClose?: () => void) {
  const ref = useRef<T>(null)
  const close = useRef(onClose)
  close.current = onClose

  useEffect(() => {
    if (!open) return
    const node = ref.current
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => {
      const first = node?.querySelector<HTMLElement>('[data-autofocus]') ?? node?.querySelector<HTMLElement>(FOCUSABLE)
      first?.focus()
    }, 30)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); close.current?.() }
      if (e.key !== 'Tab' || !node) return
      const items = [...node.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(el => el.offsetParent !== null)
      if (!items.length) return
      const first = items[0], last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [open])

  return ref
}
