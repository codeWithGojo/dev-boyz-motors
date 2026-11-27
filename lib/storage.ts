/** localStorage helpers that never throw (private mode, blocked storage, SSR). */
export function readStore<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback
    const raw = window.localStorage.getItem(key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function writeStore(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}
