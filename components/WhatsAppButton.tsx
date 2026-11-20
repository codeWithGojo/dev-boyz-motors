'use client'
import { MessageCircle } from 'lucide-react'
import { site, whatsappUrl } from '@/lib/site'
export function WhatsAppButton() {
  return <a href={whatsappUrl('Hello DEV BOYZ MOTORS. I would like to enquire about your vehicles.')} target="_blank" rel="noopener noreferrer" aria-label={`Chat with DEV BOYZ MOTORS on WhatsApp at ${site.phone}`} className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#166c4a] text-white shadow-xl shadow-black/20 transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-bronze md:bottom-8 md:right-8" title="Chat with us on WhatsApp"><MessageCircle size={26} strokeWidth={2}/></a>
}
