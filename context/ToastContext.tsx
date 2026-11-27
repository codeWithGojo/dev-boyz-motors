'use client'
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { Check, X } from 'lucide-react'

type Toast = { id: number; message: string; action?: { label: string; onClick: () => void } }
type ToastApi = { toast: (message: string, action?: Toast['action']) => void }

const ToastContext = createContext<ToastApi | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(1)
  const dismiss = useCallback((id: number) => setToasts(list => list.filter(t => t.id !== id)), [])
  const toast = useCallback((message: string, action?: Toast['action']) => {
    const id = nextId.current++
    setToasts(list => [...list.slice(-2), { id, message, action }])
    window.setTimeout(() => dismiss(id), 4500)
  }, [dismiss])
  const api = useMemo(() => ({ toast }), [toast])

  return <ToastContext.Provider value={api}>
    {children}
    <div aria-live="polite" aria-atomic="false" className="pointer-events-none fixed inset-x-0 bottom-24 z-[120] flex flex-col items-center gap-2 px-4 md:bottom-8">
      {toasts.map(t => <div key={t.id} role="status" className="pointer-events-auto flex w-full max-w-sm animate-toast-in items-center gap-3 rounded-2xl bg-night px-4 py-3 text-sm text-white shadow-2xl shadow-black/30 ring-1 ring-white/10">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-bronze"><Check size={14} /></span>
        <span className="min-w-0 flex-1">{t.message}</span>
        {t.action && <button type="button" onClick={() => { t.action!.onClick(); dismiss(t.id) }} className="rounded-full px-2 py-1 font-semibold text-bronze hover:bg-white/10">{t.action.label}</button>}
        <button type="button" aria-label="Dismiss notification" onClick={() => dismiss(t.id)} className="rounded-full p-1 text-white/60 hover:text-white"><X size={15} /></button>
      </div>)}
    </div>
  </ToastContext.Provider>
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
