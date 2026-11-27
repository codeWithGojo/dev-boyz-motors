'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Clock, Columns3, Heart, Mail, MapPin, Menu, MessageCircle, Moon, MousePointer2, Phone, Search, Settings2, ShoppingBag, Sun, X } from 'lucide-react'
import { useGarageCars, useShop } from '@/context/ShopContext'
import { usePrefs, type CursorStyle } from '@/context/PreferencesContext'
import { money } from '@/data/cars'
import { site, whatsappUrl } from '@/lib/site'
import type { I18nKey } from '@/lib/i18n'
import { useDialog } from '@/lib/useDialog'
import { VehicleImage } from './VehicleImage'
import { openCommandPalette } from './CommandPalette'
import { AccentPicker } from './AccentPicker'

const links: [string, I18nKey][] = [
  ['/showroom', 'nav.showroom'], ['/build', 'nav.build'], ['/compare', 'nav.compare'], ['/find-my-car', 'nav.finder'],
]
// Secondary pages grouped into two quiet menus to keep the bar minimal.
const menus: { key: I18nKey; items: [string, string, string][] }[] = [
  { key: 'nav.ownership', items: [
    ['/service', 'Book a service', 'Collection, servicing and detailing'],
    ['/portal', 'Owner’s portal', 'Documents, service and concierge'],
    ['/accessories', 'Accessories', 'Leather goods, care and tech'],
    ['/financing', 'Financing', 'Estimate your monthly payments'],
    ['/sell-your-car', 'Sell or trade in', 'Instant estimate, firm offer'],
    ['/locations', 'Showrooms', 'Lagos, Abuja, Port Harcourt'],
  ] },
  { key: 'nav.discover', items: [
    ['/gallery', 'Virtual showroom', 'Walk the floor, full screen'],
    ['/new-arrivals', 'New arrivals', 'The latest in the collection'],
    ['/craftsmanship', 'Craftsmanship', 'Our story and materials'],
    ['/innovation', 'Innovation', 'Hybrids, EVs and sustainability'],
    ['/events', 'Private events', 'By invitation'],
    ['/journal', 'Journal', 'Guides and stories'],
    ['/owner', 'Meet the owner', 'Imegu Favour Ewomazino'],
  ] },
]

function NavMenu({ label, items, path }: { label: string; items: [string, string, string][]; path: string | null }) {
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const active = items.some(([href]) => path === href)
  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown); document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [open])
  return <div ref={box} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
    <button type="button" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(v => !v)} className={`flex items-center gap-1 text-[14px] tracking-[.01em] transition hover:text-bronze ${active ? 'text-ink' : 'text-ink/75'}`}>
      {label}<ChevronDown size={14} className={`transition ${open ? 'rotate-180' : ''}`} />
    </button>
    {open && <div className="absolute left-1/2 top-full z-50 w-[420px] -translate-x-1/2 pt-4">
      <div className="grid animate-fade-up grid-cols-2 gap-1 rounded-3xl bg-card p-3 shadow-2xl ring-1 ring-line/10">
        {items.map(([href, title, hint]) => <Link key={href} href={href} className={`rounded-2xl p-3 transition hover:bg-surface ${path === href ? 'bg-surface' : ''}`}><span className="block font-display text-[17px]">{title}</span><span className="block text-xs text-muted">{hint}</span></Link>)}
      </div>
    </div>}
  </div>
}

function Logo() {
  return <Link href="/" aria-label="DEV BOYZ MOTORS home" className="flex min-w-0 flex-col leading-none">
    <span className="font-display text-[17px] font-semibold tracking-[.14em] [font-variant:small-caps] sm:text-[21px] sm:tracking-[.18em]">Dev Boyz</span>
    <span className="mt-1 text-[8px] font-medium tracking-[.5em] text-bronze sm:text-[9px] sm:tracking-[.62em]">MOTORS</span>
  </Link>
}

export function SkipLink() {
  return <a href="#main" className="sr-only z-[200] rounded-full bg-ink px-5 py-3 text-sm font-semibold text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
}

export function SiteHeader() {
  const path = usePathname()
  const { t } = usePrefs()
  const [mobile, setMobile] = useState(false)
  const { wishlist, garage, compare, setGarageOpen } = useShop()
  useEffect(() => setMobile(false), [path])

  return <>
    <div className="bg-night px-4 py-2 text-center text-[10px] font-medium tracking-wide text-white/75">Demo project · Sample inventory &amp; prices · Press <kbd className="rounded bg-white/10 px-1">Ctrl K</kbd> to search</div>
    <header className="sticky top-0 z-50 border-b border-line/10 bg-canvas/90 backdrop-blur-xl">
      <div className="section-wrap flex min-h-[72px] items-center justify-between gap-2 py-2 sm:gap-4 md:min-h-[78px]">
        <Logo />
        <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex">
          {links.map(([url, key]) => <Link key={url} href={url} aria-current={path === url ? 'page' : undefined} className={`text-[14px] font-normal tracking-[.01em] transition hover:text-bronze ${path === url ? 'text-ink underline decoration-bronze decoration-1 underline-offset-[10px]' : 'text-ink/75'}`}>{t(key)}</Link>)}
          {menus.map(m => <NavMenu key={m.key} label={t(m.key)} items={m.items} path={path} />)}
        </nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <button type="button" onClick={openCommandPalette} aria-label="Search (Ctrl K)" className="circle-btn"><Search size={18} /></button>
          <SettingsMenu />
          <Link href="/compare" aria-label={`Compare, ${compare.length} selected`} className="circle-btn relative hidden sm:grid"><Columns3 size={18} />{compare.length > 0 && <Badge count={compare.length} />}</Link>
          <Link href="/garage" aria-label={`Wishlist, ${wishlist.length} saved`} className="circle-btn relative"><Heart size={18} />{wishlist.length > 0 && <Badge count={wishlist.length} />}</Link>
          <button type="button" onClick={() => setGarageOpen(true)} aria-label={`Open garage, ${garage.length} saved`} className="circle-btn relative"><ShoppingBag size={18} />{garage.length > 0 && <Badge count={garage.length} />}</button>
          <Link href="/contact" className="hidden rounded-full bg-ink px-5 py-3 text-xs font-semibold text-canvas lg:block">{t('nav.contact')}</Link>
          <button type="button" aria-label={mobile ? 'Close navigation' : 'Open navigation'} aria-expanded={mobile} aria-controls="mobile-navigation" onClick={() => setMobile(v => !v)} className="circle-btn xl:hidden">{mobile ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </div>
      {mobile && <nav id="mobile-navigation" aria-label="Mobile navigation" className="animate-fade-up border-t border-line/10 bg-card px-5 pb-6 pt-3 xl:hidden">
        {links.map(([href, key]) => <Link href={href} key={href} className="block border-b border-line/5 py-3.5 font-display text-lg">{t(key)}</Link>)}
        {menus.map(m => <div key={m.key} className="border-b border-line/5 py-3"><p className="eyebrow py-2">{t(m.key)}</p><div className="grid grid-cols-2 gap-x-4">{m.items.map(([href, title]) => <Link key={href} href={href} className="py-2 text-sm">{title}</Link>)}</div></div>)}
        <Link href="/garage" className="block border-b border-line/5 py-3.5 text-sm font-semibold">Garage &amp; wishlist</Link>
        <Link href="/contact" className="block py-3.5 text-sm font-semibold">{t('nav.contact')}</Link>
      </nav>}
    </header>
  </>
}

function SettingsMenu() {
  const { theme, setTheme, cursor, setCursor, lang, setLang, t } = usePrefs()
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [open])

  const cursors: [CursorStyle, string][] = [['ring', 'Ring'], ['spotlight', 'Spotlight'], ['system', 'Classic']]
  return <div ref={box} className="relative">
    <button type="button" aria-label={t('settings.title')} aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(v => !v)} className="circle-btn"><Settings2 size={18} /></button>
    {open && <div className="absolute right-0 top-14 z-50 w-80 max-w-[calc(100vw-2rem)] animate-fade-up rounded-3xl bg-card p-5 shadow-2xl ring-1 ring-line/10">
      <p className="eyebrow">{t('settings.title')}</p>
      <fieldset className="mt-4"><legend className="mb-2 text-xs font-semibold text-muted">Finish &amp; typeface</legend><AccentPicker variant="full" /></fieldset>
      <Group label={t('settings.theme')}>
        <Choice active={theme === 'light'} onClick={() => setTheme('light')}><Sun size={15} /> Light</Choice>
        <Choice active={theme === 'dark'} onClick={() => setTheme('dark')}><Moon size={15} /> Dark</Choice>
      </Group>
      <Group label={t('settings.cursor')}>
        {cursors.map(([value, label]) => <Choice key={value} active={cursor === value} onClick={() => setCursor(value)}>{value === 'system' && <MousePointer2 size={14} />}{label}</Choice>)}
      </Group>
      <Group label={t('settings.language')}>
        <Choice active={lang === 'en'} onClick={() => setLang('en')}>English</Choice>
        <Choice active={lang === 'pcm'} onClick={() => setLang('pcm')}>Pidgin</Choice>
      </Group>
      <p className="mt-4 text-[11px] leading-4 text-muted">Custom cursors appear with a mouse or trackpad, and turn off if your device asks for reduced motion.</p>
    </div>}
  </div>
}
function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return <fieldset className="mt-4"><legend className="mb-2 text-xs font-semibold text-muted">{label}</legend><div className="flex gap-1.5 rounded-2xl bg-line/[.05] p-1">{children}</div></fieldset>
}
function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-pressed={active} onClick={onClick} className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-semibold transition ${active ? 'bg-ink text-canvas shadow' : 'text-muted hover:text-ink'}`}>{children}</button>
}

function Badge({ count }: { count: number }) {
  return <span key={count} className="absolute -right-1 -top-1 grid h-5 min-w-5 animate-pop-in place-items-center rounded-full bg-bronze px-1 text-[10px] font-bold text-white">{count}</span>
}

export function GarageDrawer() {
  const { garageOpen, setGarageOpen, removeGarage, clearGarage } = useShop()
  const selected = useGarageCars()
  const router = useRouter()
  const total = selected.reduce((sum, c) => sum + c.price, 0)
  const panel = useDialog<HTMLElement>(garageOpen, () => setGarageOpen(false))

  return <div className={`fixed inset-0 z-[85] ${garageOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} inert={!garageOpen} aria-hidden={!garageOpen}>
    <button type="button" tabIndex={-1} aria-label="Close garage" onClick={() => setGarageOpen(false)} className={`absolute inset-0 bg-black/60 transition-opacity ${garageOpen ? 'opacity-100' : 'opacity-0'}`} />
    <aside ref={panel} role="dialog" aria-modal="true" aria-label="Your garage" className={`absolute right-0 top-0 flex h-full w-full max-w-[500px] flex-col bg-canvas shadow-2xl transition-transform duration-300 ${garageOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between border-b border-line/10 p-6">
        <div><h2 className="text-2xl font-bold">Your garage</h2><p className="text-sm text-muted">{selected.length} {selected.length === 1 ? 'vehicle' : 'vehicles'} selected</p></div>
        <button type="button" onClick={() => setGarageOpen(false)} aria-label="Close" className="circle-btn"><X size={20} /></button>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        {selected.length === 0
          ? <EmptyState icon={<ShoppingBag size={26} />} title="Your garage is empty" body="Add cars from the showroom to compare totals and enquire about several at once." action={<Link href="/showroom" onClick={() => setGarageOpen(false)} className="pill-black mt-5">Explore the showroom</Link>} />
          : selected.map(car => <div key={car.id} className="flex min-w-0 flex-wrap gap-3 rounded-2xl bg-surface p-3 sm:flex-nowrap">
            <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl"><VehicleImage car={car} sizes="150px" /></div>
            <div className="min-w-0 flex-1"><Link href={`/cars/${car.slug}`} onClick={() => setGarageOpen(false)} className="font-bold hover:underline">{car.brand} {car.model}</Link><div className="mt-1 text-xs text-muted">{car.year} · {car.condition}</div><p className="mt-1 text-sm font-bold">{money(car.price)}</p></div>
            <button type="button" onClick={() => removeGarage(car.id)} className="self-center text-xs underline">Remove</button>
          </div>)}
        {selected.length > 0 && <button type="button" onClick={clearGarage} className="text-sm text-muted underline underline-offset-4">Clear garage</button>}
      </div>
      <div className="border-t border-line/10 bg-card p-6">
        <div className="flex flex-wrap justify-between gap-2 text-sm"><span>Total</span><strong>{money(total)}</strong></div>
        <button type="button" disabled={selected.length === 0} onClick={() => { setGarageOpen(false); router.push('/garage') }} className="pill-black mt-4 w-full gap-2 disabled:opacity-40">View saved vehicles <ArrowRight size={17} /></button>
      </div>
    </aside>
  </div>
}

export function EmptyState({ icon, title, body, action }: { icon: React.ReactNode; title: string; body: string; action?: React.ReactNode }) {
  return <div className="flex flex-col items-center rounded-[26px] border border-dashed border-line/15 bg-card px-6 py-12 text-center">
    <div className="relative grid h-20 w-20 place-items-center">
      <span className="absolute inset-0 animate-ping rounded-full bg-bronze/10" style={{ animationDuration: '2.4s' }} />
      <span className="relative grid h-16 w-16 place-items-center rounded-full bg-bronze/15 text-bronze">{icon}</span>
    </div>
    <p className="mt-5 text-lg font-bold">{title}</p>
    <p className="mt-2 max-w-sm text-sm leading-6 text-muted">{body}</p>
    {action}
  </div>
}

function Year() {
  const [year, setYear] = useState<number | null>(null)
  useEffect(() => setYear(new Date().getFullYear()), [])
  return <>{year ?? ''}</>
}

export function Footer() {
  const { t } = usePrefs()
  return <footer className="mt-10 bg-night text-white">
    <div className="section-wrap grid gap-12 py-16 md:grid-cols-4">
      <div><Logo /><p className="mt-6 max-w-xs text-sm leading-7 text-white/60">{t('footer.tagline')} Explore the collection, compare models, and arrange a private viewing.</p></div>
      <div><div className="eyebrow">Explore</div><div className="mt-5 flex flex-col gap-3 text-sm text-white/70"><Link href="/showroom">Showroom</Link><Link href="/build">Build &amp; price</Link><Link href="/gallery">Virtual showroom</Link><Link href="/compare">Compare</Link><Link href="/find-my-car">Find my car</Link><Link href="/accessories">Accessories</Link><Link href="/journal">Journal</Link></div></div>
      <div><div className="eyebrow">Company</div><div className="mt-5 flex flex-col gap-3 text-sm text-white/70"><Link href="/about">About</Link><Link href="/craftsmanship">Craftsmanship</Link><Link href="/owner">Meet the owner</Link><Link href="/locations">Showrooms</Link><Link href="/service">Service</Link><Link href="/portal">Owner’s portal</Link><Link href="/events">Events</Link><Link href="/financing">Financing</Link><Link href="/sell-your-car">Sell or trade in</Link><Link href="/insights">Insights (demo)</Link><Link href="/admin">Admin (demo)</Link></div></div>
      <div><div className="eyebrow">Contact</div><div className="mt-5 space-y-3 text-sm text-white/70">
        <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className="flex gap-3 hover:text-white"><Phone size={16} />{site.phone}</a>
        <a href={`mailto:${site.email}`} className="flex gap-3 break-all hover:text-white"><Mail size={16} />{site.email}</a>
        <a href={whatsappUrl('Hello DEV BOYZ MOTORS, I would like to enquire.')} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white"><MessageCircle size={16} />WhatsApp</a>
        <p className="flex gap-3"><Clock size={16} />{site.hours}</p>
        <p className="flex gap-3"><MapPin size={16} />{site.address || 'Lagos, Nigeria · by appointment'}</p>
      </div></div>
    </div>
    <div className="border-t border-white/10"><div className="section-wrap flex flex-col justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row">
      <span>© <Year /> DEV BOYZ MOTORS · Demo project with sample inventory, prices and testimonials.</span>
      <span>Vehicle photos: Wikimedia Commons, credited on each car page</span>
    </div></div>
  </footer>
}
