/** Consistent editorial page opening: eyebrow, large serif title, calm lead paragraph. */
export function PageIntro({ eyebrow, title, lead, children, dark = false }: { eyebrow: string; title: React.ReactNode; lead?: string; children?: React.ReactNode; dark?: boolean }) {
  return <header className={dark ? 'bg-night text-white' : 'hero-bg'}>
    <div className="section-wrap pb-14 pt-16 md:pb-20 md:pt-24">
      <div className="eyebrow animate-fade-up">{eyebrow}</div>
      <h1 className="mt-5 max-w-4xl animate-fade-up text-[clamp(2.6rem,6vw,5.5rem)] [animation-delay:100ms]">{title}</h1>
      {lead && <p className={`mt-6 max-w-2xl animate-fade-up text-lg font-light leading-8 [animation-delay:200ms] ${dark ? 'text-white/70' : 'text-ink/75'}`}>{lead}</p>}
      {children && <div className="mt-8 animate-fade-up [animation-delay:300ms]">{children}</div>}
    </div>
  </header>
}
