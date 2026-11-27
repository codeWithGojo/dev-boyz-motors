'use client'
import { Share2 } from 'lucide-react'
import { useToast } from '@/context/ToastContext'

/** Native share sheet on phones; copies the link everywhere else. */
export function ShareButton({ title, text, className = 'pill-outline gap-2' }: { title: string; text: string; className?: string }) {
  const { toast } = useToast()
  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title, text, url }); return } catch (err) { if ((err as Error).name === 'AbortError') return }
    }
    try { await navigator.clipboard.writeText(url); toast('Link copied — paste it into WhatsApp') } catch { toast('Copy this link: ' + url) }
  }
  return <button type="button" onClick={share} className={className}><Share2 size={16} /> Share</button>
}
