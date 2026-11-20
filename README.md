# DEV BOYZ MOTORS

A responsive, frontend-only luxury Nigerian car dealership demo built from supplied visual references. It includes a 28-car showroom, live filters/sorting, car detail galleries, wishlist and garage state, a slide-in garage drawer, localStorage persistence, and a mocked reservation checkout.

## Stack
- Next.js 15 App Router
- React 19 + TypeScript
- Tailwind CSS
- Lucide React
- Local mock data only

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Production
```bash
npm run build
npm start
```

## Main routes
- `/` Home
- `/showroom` Live filtering/sorting
- `/cars/[slug]` Vehicle details
- `/checkout` Reservation checkout demo
- `/new-arrivals`
- `/brands`
- `/sell-your-car`
- `/financing`
- `/about`

## Easy edits
- Inventory and prices: `data/cars.ts`
- Editorial image map: `data/images.ts`
- Brand/header/footer: `components/SiteChrome.tsx`
- Global colors/radii/type utilities: `app/globals.css` and `tailwind.config.ts`
- Homepage sections: `app/page.tsx`

The current image URLs are placeholders from Unsplash and are intentionally centralized so they can be replaced with real dealership photography.

## Vercel
Push this folder to GitHub and import the repository in Vercel. No environment variables, backend, or database are required. The project is designed to deploy with the default Next.js settings.

## Demo disclaimer
All vehicle data is mocked. Checkout does **not** process a real payment; the payment CTA displays a demo success state only.
