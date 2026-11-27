import type { MetadataRoute } from 'next'
import { cars } from '@/data/cars'
import { site } from '@/lib/site'
import { articles } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/showroom', '/new-arrivals', '/brands', '/find-my-car', '/compare', '/financing', '/sell-your-car', '/contact', '/about', '/owner', '/build', '/gallery', '/craftsmanship', '/accessories', '/locations', '/service', '/innovation', '/events', '/journal']
  return [
    ...pages.map(path => ({ url: `${site.url}${path}`, changeFrequency: 'weekly' as const, priority: path === '' ? 1 : 0.7 })),
    ...cars.map(c => ({ url: `${site.url}/cars/${c.slug}`, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...articles.map(a => ({ url: `${site.url}/journal/${a.slug}`, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
}
