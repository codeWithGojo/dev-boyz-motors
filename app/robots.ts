import { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {return {rules:{userAgent:'*',allow:'/'},sitemap:'https://dev-boyz-motors.vercel.app/sitemap.xml'}}
