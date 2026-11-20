import { MetadataRoute } from 'next'
import { cars } from '@/data/cars'
export default function sitemap(): MetadataRoute.Sitemap { const base='https://dev-boyz-motors.vercel.app'; return [{url:base},{url:`${base}/showroom`},{url:`${base}/new-arrivals`},{url:`${base}/brands`},{url:`${base}/about`},{url:`${base}/financing`},{url:`${base}/sell-your-car`},...cars.map(c=>({url:`${base}/cars/${c.slug}`}))] }
