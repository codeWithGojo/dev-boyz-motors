'use client'
import { useRef, useState } from 'react'
import { Power, Volume2 } from 'lucide-react'
import type { Car } from '@/data/cars'

/**
 * A synthesised start-up and rev (Web Audio API, no audio files).
 * V8s get a deep rumble, smaller engines a higher note, electric cars a whine.
 */
export function EngineSound({ car }: { car: Car }) {
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)

  const play = async () => {
    if (playing) return
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return
    const ctx = ctxRef.current ?? new AudioCtx()
    ctxRef.current = ctx
    await ctx.resume()
    setPlaying(true)

    const now = ctx.currentTime
    const electric = car.fuel === 'Electric'
    const cylinders = /V12/.test(car.engine) ? 12 : /V8/.test(car.engine) ? 8 : /V6|I6/.test(car.engine) ? 6 : 4
    const idle = electric ? 180 : cylinders === 12 ? 28 : cylinders === 8 ? 34 : cylinders === 6 ? 44 : 56
    const peak = electric ? 900 : idle * 4.2
    const master = ctx.createGain()
    master.gain.setValueAtTime(0.0001, now)
    master.gain.exponentialRampToValueAtTime(0.35, now + 0.15)
    master.gain.setValueAtTime(0.35, now + 3)
    master.gain.exponentialRampToValueAtTime(0.0001, now + 4.2)
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(electric ? 3000 : 500, now)
    filter.frequency.linearRampToValueAtTime(electric ? 5000 : 1800, now + 1.8)
    filter.frequency.linearRampToValueAtTime(electric ? 3000 : 600, now + 3.6)
    filter.connect(master).connect(ctx.destination)

    const voices = electric ? [{ type: 'sine' as OscillatorType, mult: 1 }, { type: 'sine' as OscillatorType, mult: 2.01 }] : [{ type: 'sawtooth' as OscillatorType, mult: 1 }, { type: 'square' as OscillatorType, mult: 0.5 }, { type: 'sawtooth' as OscillatorType, mult: 2.003 }]
    const oscillators = voices.map(v => {
      const osc = ctx.createOscillator()
      osc.type = v.type
      const f = osc.frequency
      f.setValueAtTime(idle * v.mult * (electric ? 0.2 : 1.6), now)
      f.exponentialRampToValueAtTime(idle * v.mult, now + 0.6)
      f.exponentialRampToValueAtTime(peak * v.mult, now + 1.7)
      f.exponentialRampToValueAtTime(idle * 1.5 * v.mult, now + 2.6)
      f.exponentialRampToValueAtTime(peak * 0.8 * v.mult, now + 3.1)
      f.exponentialRampToValueAtTime(idle * v.mult, now + 4)
      const g = ctx.createGain()
      g.gain.value = v.mult < 1 ? 0.6 : 0.35
      osc.connect(g).connect(filter)
      osc.start(now)
      osc.stop(now + 4.3)
      return osc
    })
    if (!electric) {
      // Firing-pulse tremolo gives the engine its burble.
      const lfo = ctx.createOscillator()
      const depth = ctx.createGain()
      lfo.frequency.setValueAtTime(idle / 2, now)
      lfo.frequency.exponentialRampToValueAtTime(peak / 2, now + 1.7)
      lfo.frequency.exponentialRampToValueAtTime(idle / 2, now + 4)
      depth.gain.value = 0.25
      lfo.connect(depth).connect(master.gain)
      lfo.start(now)
      lfo.stop(now + 4.3)
    }
    oscillators[0].onended = () => setPlaying(false)
  }

  return <button type="button" onClick={play} aria-pressed={playing} data-cursor={playing ? 'Vroom' : 'Start'}
    className={`group flex w-full items-center gap-4 rounded-3xl p-5 text-left ring-1 transition ${playing ? 'bg-bronze text-white ring-bronze' : 'bg-night text-white ring-white/10 hover:ring-bronze'}`}>
    <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 ${playing ? 'animate-pulse border-white' : 'border-bronze text-bronze group-hover:bg-bronze group-hover:text-white'}`}><Power size={24} /></span>
    <span className="min-w-0"><strong className="block">{playing ? 'Engine running…' : car.fuel === 'Electric' ? 'Hear the motors' : 'Start the engine'}</strong><span className="mt-1 flex items-center gap-1.5 text-xs text-white/60"><Volume2 size={13} /> Synthesised sound · turn your volume down first</span></span>
  </button>
}
