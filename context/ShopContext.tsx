'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useInventory } from './InventoryContext'
import { useToast } from './ToastContext'
import { usePrefs } from './PreferencesContext'
import { readStore, writeStore } from '@/lib/storage'

type ShopState = {
  wishlist: string[]
  garage: string[]
  compare: string[]
  recent: string[]
  garageOpen: boolean
  toggleWishlist: (id: string) => void
  toggleGarage: (id: string) => void
  toggleCompare: (id: string) => void
  removeGarage: (id: string) => void
  clearGarage: () => void
  clearWishlist: () => void
  clearCompare: () => void
  markViewed: (id: string) => void
  setGarageOpen: (v: boolean) => void
}

const ShopContext = createContext<ShopState | null>(null)
const MAX_COMPARE = 3

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const { t } = usePrefs()
  const [wishlist, setWishlist] = useState<string[]>([])
  const [garage, setGarage] = useState<string[]>([])
  const [compare, setCompare] = useState<string[]>([])
  const [recent, setRecent] = useState<string[]>([])
  const [garageOpen, setGarageOpen] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setWishlist(readStore<string[]>('dbm-wishlist', []))
    setGarage(readStore<string[]>('dbm-garage', []))
    setCompare(readStore<string[]>('dbm-compare', []))
    setRecent(readStore<string[]>('dbm-recent', []))
    setReady(true)
  }, [])
  useEffect(() => { if (ready) writeStore('dbm-wishlist', wishlist) }, [wishlist, ready])
  useEffect(() => { if (ready) writeStore('dbm-garage', garage) }, [garage, ready])
  useEffect(() => { if (ready) writeStore('dbm-compare', compare) }, [compare, ready])
  useEffect(() => { if (ready) writeStore('dbm-recent', recent) }, [recent, ready])

  const toggleWishlist = useCallback((id: string) => {
    const had = wishlist.includes(id)
    setWishlist(v => had ? v.filter(x => x !== id) : [...v, id])
    toast(t(had ? 'toast.wishlistRemove' : 'toast.wishlistAdd'), { label: t('toast.undo'), onClick: () => setWishlist(v => had ? [...v, id] : v.filter(x => x !== id)) })
  }, [wishlist, toast, t])

  const toggleGarage = useCallback((id: string) => {
    const had = garage.includes(id)
    setGarage(v => had ? v.filter(x => x !== id) : [...v, id])
    toast(t(had ? 'toast.garageRemove' : 'toast.garageAdd'), { label: t('toast.undo'), onClick: () => setGarage(v => had ? [...v, id] : v.filter(x => x !== id)) })
  }, [garage, toast, t])

  const toggleCompare = useCallback((id: string) => {
    const had = compare.includes(id)
    if (!had && compare.length >= MAX_COMPARE) { toast(t('toast.compareFull')); return }
    setCompare(v => had ? v.filter(x => x !== id) : [...v, id])
    toast(t(had ? 'toast.compareRemove' : 'toast.compareAdd'), { label: t('toast.undo'), onClick: () => setCompare(v => had ? [...v, id] : v.filter(x => x !== id)) })
  }, [compare, toast, t])

  const removeGarage = useCallback((id: string) => {
    setGarage(v => v.filter(x => x !== id))
    toast(t('toast.garageRemove'), { label: t('toast.undo'), onClick: () => setGarage(v => v.includes(id) ? v : [...v, id]) })
  }, [toast, t])

  const clearGarage = useCallback(() => {
    const previous = garage
    setGarage([])
    toast('Garage cleared', { label: t('toast.undo'), onClick: () => setGarage(previous) })
  }, [garage, toast, t])

  const clearWishlist = useCallback(() => {
    const previous = wishlist
    setWishlist([])
    toast('Wishlist cleared', { label: t('toast.undo'), onClick: () => setWishlist(previous) })
  }, [wishlist, toast, t])

  const clearCompare = useCallback(() => setCompare([]), [])
  const markViewed = useCallback((id: string) => setRecent(v => [id, ...v.filter(x => x !== id)].slice(0, 6)), [])

  const value = useMemo(() => ({
    wishlist, garage, compare, recent, garageOpen,
    toggleWishlist, toggleGarage, toggleCompare, removeGarage, clearGarage, clearWishlist, clearCompare, markViewed, setGarageOpen,
  }), [wishlist, garage, compare, recent, garageOpen, toggleWishlist, toggleGarage, toggleCompare, removeGarage, clearGarage, clearWishlist, clearCompare, markViewed])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used in ShopProvider')
  return ctx
}

/** Resolve a list of saved ids into live car records, keeping the saved order. */
export function useCarsByIds(ids: string[]) {
  const { cars } = useInventory()
  return ids.map(id => cars.find(c => c.id === id)).filter((c): c is NonNullable<typeof c> => Boolean(c))
}

export function useGarageCars() {
  const { garage } = useShop()
  return useCarsByIds(garage)
}
