'use client'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translate, type I18nKey, type Lang } from '@/lib/i18n'
import { readStore, writeStore } from '@/lib/storage'
import { isAccent, type Accent } from '@/lib/accents'

export type Theme = 'light' | 'dark'
export type CursorStyle = 'ring' | 'spotlight' | 'system'

type Prefs = {
  theme: Theme
  setTheme: (t: Theme) => void
  accent: Accent
  setAccent: (a: Accent) => void
  cursor: CursorStyle
  setCursor: (c: CursorStyle) => void
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: I18nKey) => string
}

const PreferencesContext = createContext<Prefs | null>(null)

/** Runs before paint (inlined in <head>) so the page never flashes the wrong theme or finish. */
export const themeBootScript = `try{var d=document.documentElement,t=JSON.parse(localStorage.getItem('dbm-theme'));if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark');var a=JSON.parse(localStorage.getItem('dbm-accent'));if(['bronze','emerald','oxblood','sapphire'].indexOf(a)>-1)d.setAttribute('data-accent',a)}catch(e){}`

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')
  const [accent, setAccentState] = useState<Accent>('bronze')
  const [cursor, setCursorState] = useState<CursorStyle>('ring')
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    setThemeState(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    const stored = document.documentElement.dataset.accent
    if (isAccent(stored)) setAccentState(stored)
    setCursorState(readStore<CursorStyle>('dbm-cursor', 'ring'))
    setLangState(readStore<Lang>('dbm-lang', 'en'))
  }, [])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    document.documentElement.classList.toggle('dark', t === 'dark')
    writeStore('dbm-theme', t)
  }, [])
  const setAccent = useCallback((a: Accent) => {
    setAccentState(a)
    document.documentElement.dataset.accent = a
    writeStore('dbm-accent', a)
  }, [])
  const setCursor = useCallback((c: CursorStyle) => { setCursorState(c); writeStore('dbm-cursor', c) }, [])
  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    writeStore('dbm-lang', l)
    document.documentElement.lang = l === 'pcm' ? 'pcm' : 'en'
  }, [])
  const t = useCallback((key: I18nKey) => translate(lang, key), [lang])

  const value = useMemo(() => ({ theme, setTheme, accent, setAccent, cursor, setCursor, lang, setLang, t }), [theme, setTheme, accent, setAccent, cursor, setCursor, lang, setLang, t])
  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePrefs() {
  const ctx = useContext(PreferencesContext)
  if (!ctx) throw new Error('usePrefs must be used inside PreferencesProvider')
  return ctx
}
