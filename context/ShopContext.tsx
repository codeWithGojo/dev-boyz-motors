'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { cars } from '@/data/cars'

type ShopState = {
  wishlist: string[]
  garage: string[]
  garageOpen: boolean
  toggleWishlist: (id:string)=>void
  toggleGarage: (id:string)=>void
  removeGarage: (id:string)=>void
  clearGarage: ()=>void
  clearWishlist: ()=>void
  setGarageOpen: (v:boolean)=>void
}

const ShopContext = createContext<ShopState | null>(null)

export function ShopProvider({children}:{children:React.ReactNode}) {
  const [wishlist,setWishlist] = useState<string[]>([])
  const [garage,setGarage] = useState<string[]>([])
  const [garageOpen,setGarageOpen] = useState(false)
  const [ready,setReady] = useState(false)

  useEffect(()=>{
    try {
      setWishlist(JSON.parse(localStorage.getItem('dbm-wishlist') || '[]'))
      setGarage(JSON.parse(localStorage.getItem('dbm-garage') || '[]'))
    } catch {}
    setReady(true)
  },[])
  useEffect(()=>{ if(ready) localStorage.setItem('dbm-wishlist', JSON.stringify(wishlist)) },[wishlist,ready])
  useEffect(()=>{ if(ready) localStorage.setItem('dbm-garage', JSON.stringify(garage)) },[garage,ready])
  useEffect(()=>{
    const onKey = (e:KeyboardEvent)=>{ if(e.key==='Escape') setGarageOpen(false) }
    window.addEventListener('keydown', onKey)
    return ()=>window.removeEventListener('keydown',onKey)
  },[])

  const value = useMemo(()=>({
    wishlist, garage, garageOpen,
    toggleWishlist:(id:string)=>setWishlist(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]),
    toggleGarage:(id:string)=>setGarage(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]),
    removeGarage:(id:string)=>setGarage(v=>v.filter(x=>x!==id)),
    clearGarage:()=>setGarage([]),
    clearWishlist:()=>setWishlist([]),
    setGarageOpen
  }),[wishlist,garage,garageOpen])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop(){
  const ctx = useContext(ShopContext)
  if(!ctx) throw new Error('useShop must be used in ShopProvider')
  return ctx
}

export function useGarageCars(){
  const {garage} = useShop()
  return cars.filter(c=>garage.includes(c.id))
}
