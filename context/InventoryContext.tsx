'use client'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { cars as baseCars, type Availability, type Car } from '@/data/cars'
import { readStore, writeStore } from '@/lib/storage'

/** Edits made on the demo /admin page. Stored on this device only. */
export type CarOverride = { availability?: Availability; price?: number; featured?: boolean }
type Overrides = Record<string, CarOverride>

type Inventory = {
  cars: Car[]
  overrides: Overrides
  updateCar: (id: string, patch: CarOverride) => void
  resetInventory: () => void
}

const InventoryContext = createContext<Inventory | null>(null)
const KEY = 'dbm-admin-overrides'

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Overrides>({})
  useEffect(() => { setOverrides(readStore<Overrides>(KEY, {})) }, [])

  const updateCar = useCallback((id: string, patch: CarOverride) => {
    setOverrides(current => {
      const next = { ...current, [id]: { ...current[id], ...patch } }
      writeStore(KEY, next)
      return next
    })
  }, [])
  const resetInventory = useCallback(() => { setOverrides({}); writeStore(KEY, {}) }, [])

  const cars = useMemo(() => baseCars.map(car => ({ ...car, ...overrides[car.id] })), [overrides])
  const value = useMemo(() => ({ cars, overrides, updateCar, resetInventory }), [cars, overrides, updateCar, resetInventory])
  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>
}

export function useInventory() {
  const ctx = useContext(InventoryContext)
  if (!ctx) throw new Error('useInventory must be used inside InventoryProvider')
  return ctx
}

/** The live (admin-edited) version of a car, falling back to the static record. */
export function useLiveCar(car: Car) {
  const { cars } = useInventory()
  return cars.find(c => c.id === car.id) ?? car
}
