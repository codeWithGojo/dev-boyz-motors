'use client'
import { useEffect, useRef, useState } from 'react'
import type { Car } from '@/data/cars'
import { ChevronLeft, ChevronRight, Expand, Move3d, X, ZoomIn, ZoomOut } from 'lucide-react'
import { VehicleImage } from './VehicleImage'
import { useDialog } from '@/lib/useDialog'

/** Swipe on touch, drag-to-rotate with a mouse, and a full-screen zoomable lightbox. */
export function CarGallery({ car }: { car: Car }) {
  const [selected, setSelected] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const length = Math.max(1, car.images.length)
  const shift = (direction: number) => setSelected(value => (value + direction + length) % length)
  const drag = useRef<{ x: number; moved: boolean } | null>(null)

  const onPointerDown = (e: React.PointerEvent) => { drag.current = { x: e.clientX, moved: false } }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    const step = e.pointerType === 'mouse' ? 90 : 50
    if (Math.abs(dx) > step) { shift(dx < 0 ? 1 : -1); drag.current = { x: e.clientX, moved: true } }
  }
  const onPointerUp = () => { const moved = drag.current?.moved; drag.current = null; return moved }

  return <div className="min-w-0">
    <div className="relative aspect-[1.2/1] min-w-0 touch-pan-y select-none overflow-hidden rounded-[28px] bg-line/[.08] md:aspect-[1.35/1]"
      data-cursor="Drag" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerLeave={() => { drag.current = null }}
      onDoubleClick={() => setLightbox(true)}>
      {car.images.map((_, i) => <div key={i} className={`absolute inset-0 transition-opacity duration-500 ${i === selected ? 'opacity-100' : 'opacity-0'}`} aria-hidden={i !== selected}>
        <VehicleImage car={car} index={i} priority={i === 0} draggable={false} sizes="(max-width: 1024px) 100vw, 60vw" />
      </div>)}
      {car.images.length === 0 && <VehicleImage car={car} />}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3 text-white sm:p-5">
        <span className="flex items-center gap-2 text-[11px] sm:text-xs"><Move3d size={15} /> Drag or swipe to rotate · double-click to zoom</span>
        <span className="rounded-full bg-black/60 px-3 py-1.5 text-xs">{selected + 1}/{length}</span>
      </div>
      <button type="button" onClick={() => setLightbox(true)} aria-label="Open full-screen gallery" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-black"><Expand size={17} /></button>
      {length > 1 && <>
        <button type="button" onClick={() => shift(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-black"><ChevronLeft size={20} /></button>
        <button type="button" onClick={() => shift(1)} aria-label="Next photo" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-black"><ChevronRight size={20} /></button>
      </>}
    </div>
    <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
      {car.images.map((source, index) => <button type="button" key={`${index}-${source}`} onClick={() => setSelected(index)} aria-label={`Show photo ${index + 1}`} aria-pressed={selected === index} className={`relative aspect-[1.35/1] overflow-hidden rounded-xl bg-line/10 transition ${selected === index ? 'ring-2 ring-ink ring-offset-2 ring-offset-canvas' : 'opacity-70 hover:opacity-100'}`}>
        <VehicleImage car={car} index={index} sizes="(max-width: 640px) 30vw, 180px" />
      </button>)}
    </div>
    {car.photoSources[selected] && <p className="mt-4 text-xs leading-5 text-muted">Photo: <a href={car.photoSources[selected]} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">Wikimedia Commons (credit &amp; licence)</a></p>}
    {lightbox && <Lightbox car={car} index={selected} onIndex={setSelected} onClose={() => setLightbox(false)} />}
  </div>
}

function Lightbox({ car, index, onIndex, onClose }: { car: Car; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const ref = useDialog<HTMLDivElement>(true, onClose)
  const [zoom, setZoom] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')
  const length = Math.max(1, car.images.length)
  const touch = useRef<number | null>(null)
  const go = (d: number) => { setZoom(false); onIndex((index + d + length) % length) }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return <div ref={ref} role="dialog" aria-modal="true" aria-label={`${car.brand} ${car.model} photos`} className="fixed inset-0 z-[140] flex flex-col bg-black/95 text-white">
    <div className="flex items-center justify-between p-4">
      <span className="text-sm text-white/70">{car.year} {car.brand} {car.model} · {index + 1}/{length}</span>
      <div className="flex gap-2">
        <button type="button" onClick={() => setZoom(z => !z)} aria-label={zoom ? 'Zoom out' : 'Zoom in'} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">{zoom ? <ZoomOut size={19} /> : <ZoomIn size={19} />}</button>
        <button type="button" onClick={onClose} aria-label="Close gallery" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"><X size={20} /></button>
      </div>
    </div>
    <div className="relative min-h-0 flex-1 overflow-hidden" data-cursor={zoom ? 'Zoom out' : 'Zoom'}
      onClick={e => { const r = e.currentTarget.getBoundingClientRect(); setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`); setZoom(z => !z) }}
      onMouseMove={e => { if (!zoom) return; const r = e.currentTarget.getBoundingClientRect(); setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`) }}
      onTouchStart={e => { touch.current = e.touches[0].clientX }}
      onTouchEnd={e => { if (touch.current === null) return; const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); touch.current = null }}>
      <div className="absolute inset-4 transition-transform duration-300" style={{ transform: zoom ? 'scale(2.2)' : 'scale(1)', transformOrigin: origin }}>
        <div className="relative h-full w-full [&_img]:!object-contain"><VehicleImage car={car} index={index} sizes="100vw" /></div>
      </div>
      {length > 1 && <>
        <button type="button" onClick={e => { e.stopPropagation(); go(-1) }} aria-label="Previous photo" className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/25"><ChevronLeft /></button>
        <button type="button" onClick={e => { e.stopPropagation(); go(1) }} aria-label="Next photo" className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/25"><ChevronRight /></button>
      </>}
    </div>
    <p className="p-4 text-center text-xs text-white/50">Click to zoom · arrow keys or swipe to browse · Esc to close</p>
  </div>
}
