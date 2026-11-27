'use client'
import { accents, accentById } from '@/lib/accents'
import { usePrefs } from '@/context/PreferencesContext'

type Finish = (typeof accents)[number]

/** A flat, two-tone paint chip: body colour with a band of trim. */
function Chip({ finish, size = 30 }: { finish: Finish; size?: number }) {
  return <span aria-hidden="true" className="relative block shrink-0 overflow-hidden rounded-full" style={{ width: size, height: size, background: finish.body }}>
    <span className="absolute inset-0" style={{ background: `linear-gradient(135deg, transparent 52%, ${finish.trim} 52%)` }} />
    <span className="absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,.14),inset_0_1px_1px_rgba(255,255,255,.18)]" />
  </span>
}

/** Finish selector. "compact" = chips + current name (hero); "full" = cards with names and typefaces (settings). */
export function AccentPicker({ variant = 'compact' }: { variant?: 'compact' | 'full' }) {
  const { accent, setAccent } = usePrefs()
  const current = accentById(accent)

  if (variant === 'full') return <div className="space-y-1.5">
    {accents.map(a => <button key={a.id} type="button" aria-pressed={accent === a.id} onClick={() => setAccent(a.id)}
      className={`flex w-full items-center gap-3 rounded-2xl p-2 pr-3 text-left transition ${accent === a.id ? 'bg-surface ring-1 ring-ink/80' : 'hover:bg-surface/70'}`}>
      <Chip finish={a} size={34} />
      <span className="min-w-0 flex-1"><span className="block truncate text-[15px] leading-tight" style={{ fontFamily: a.fontVar }}>{a.name}</span><span className="block truncate text-[11px] text-muted">{a.font}</span></span>
      <span className="flex shrink-0 gap-0.5" aria-hidden="true">{[a.canvas, a.body, a.trim].map(c => <span key={c} className="h-3 w-3 rounded-[3px] ring-1 ring-black/10" style={{ background: c }} />)}</span>
    </button>)}
  </div>

  return <div className="flex items-center gap-3">
    <div role="group" aria-label="Choose a finish" className="flex items-center gap-1.5">
      {accents.map(a => <button key={a.id} type="button" aria-pressed={accent === a.id} aria-label={`${a.name} finish, ${a.font} typeface`} title={`${a.name} · ${a.font}`} onClick={() => setAccent(a.id)}
        className={`rounded-full p-[3px] transition duration-300 ${accent === a.id ? 'ring-1 ring-ink/70' : 'opacity-80 ring-1 ring-transparent hover:opacity-100 hover:ring-line/20'}`}>
        <Chip finish={a} size={26} />
      </button>)}
    </div>
    <span key={current.id} className="hidden animate-fade-up whitespace-nowrap text-[15px] italic text-ink/75 sm:inline" style={{ fontFamily: current.fontVar }}>{current.name}</span>
  </div>
}
