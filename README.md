# DEV BOYZ MOTORS

A luxury car dealership demo for the Nigerian market: browse, compare, configure and finance cars, get matched by an AI assistant, and enquire on WhatsApp.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, **Zod** and the **Claude API**. Tested end-to-end with **Playwright** on desktop and mobile.

> Demo project: inventory, prices, testimonials, lender names and dashboard traffic are sample data.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run typecheck
npm run test:e2e     # builds must exist first; starts the server on :3100
```

Optional environment variables (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `ANTHROPIC_API_KEY` | Turns on the AI car finder. Without it, the finder falls back to a built-in keyword matcher. |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ENQUIRY_TO_EMAIL` | Email delivery for enquiries. Without them, forms hand off to WhatsApp. |
| `NEXT_PUBLIC_DEALERSHIP_*`, `NEXT_PUBLIC_SHOWROOM_*` | Public contact details. |

## Features

**Home & brand**
- Editorial hero: brand name in Didone small caps, the model name set huge behind the car, and attribute pills (Craftsmanship, Performance, Prestige…) that switch between flagship cars, auto-advancing with a progress line.
- Four **finishes**, each a complete palette inspired by a classic paint-and-leather pairing: canvas, text, dark sections, buttons, a metallic accent, the hero backdrop and the display typeface all change together. Pick one from the hero or the settings menu; it is remembered and applied before first paint, with matching dark-mode versions.
  - Champagne & Onyx with Bodoni Moda (default)
  - Racing Green & Tan with Cormorant Garamond
  - Bordeaux & Rose Gold with Playfair Display
  - Midnight & Platinum with Syne

  Palettes live in `app/globals.css` (`[data-accent]`); names and swatches in `lib/accents.ts`.
- Meet-the-owner page for Imegu Favour Ewomazino, linking to the portfolio at imegu.world.

**Browsing**
- Showroom with brand, model, body, condition, fuel, price and year filters, free-text search, five sorts and an animated result count. Every filter lives in the URL, so links, refreshes and the back button keep it.
- Ctrl/⌘ + K (or `/`) command palette that searches every car and page.
- Recently viewed cars, wishlist and garage, saved on the device, each change with an undo toast.

**Car pages**
- Gallery with drag/swipe rotation and a full-screen lightbox with click-to-zoom, keyboard and swipe navigation.
- Cinematic performance section with count-up stats and a **synthesised engine start** (Web Audio API, no audio files; electric cars get a motor whine).
- SVG **configurator** for paint, wheels and calipers, with a running price.
- **Cost of ownership** calculator (fuel or charging, insurance, servicing, finance) with adjustable mileage and fuel price.
- Finance estimator, share button (native share sheet or copy link), similar cars and a sticky WhatsApp / viewing bar on mobile.
- Structured data (`schema.org/Car`) and a generated Open Graph image per car for rich WhatsApp and social previews.

**Premium experience**
- **Build & price** (/build): a five-step commission flow (model, exterior, interior, packages, summary) with a live preview, running total and monthly estimate. The configuration lives in the URL, so builds can be shared and saved on the device, and "Reserve a build slot" opens a prefilled enquiry.
- Car pages add an **interior & materials** showcase (CSS-drawn leather, walnut, carbon, aluminium and suede close-ups), **tech hotspots** and an **"In my driveway"** AR mock-up.
- **Virtual showroom** (/gallery), **Craftsmanship & heritage** (/craftsmanship), the limited-edition **Atelier Collection**, **Accessories** (/accessories), **Showrooms** with maps (/locations), **Service booking** (/service), **Innovation** (/innovation), **Private events** (/events) and a **Journal** with three articles (/journal).
- A demo **Owner's portal** (/portal) with car status, documents, a service planner, an owner's manual teaser and concierge. There is no real login.
- A **Concierge chat** widget with scripted quick answers that hands off to WhatsApp for a real person.
- Grouped navigation: Showroom, Build & price, Compare and Find my car, plus Ownership and Discover menus.

**Tools**
- **Find my car**: a 5-question quiz with ranked % matches, or an **AI assistant** (Claude Opus 5.5 with structured output) that only recommends cars from the inventory.
- **Compare** up to three cars side by side, with the best value in each row highlighted.
- **Trade-in estimator**: multi-step valuation that pre-fills an inspection booking.
- **Admin (demo)**: change status (Available / Reserved / Sold), price and featured flag; the whole site updates instantly (saved in the browser).
- **Insights (demo)**: KPI tiles and animated SVG charts.

**Experience**
- Light and dark themes (no flash on load), English / Nigerian Pidgin toggle for key UI text, and three **custom cursors** (ring with contextual labels like "View" and "Drag", bronze spotlight, or classic). Custom cursors switch off automatically on touch devices and with reduced motion.
- Page transitions, scroll reveals, skeleton loaders, illustrated empty states and a custom 404.
- Accessibility: skip link, focus trapping and scroll lock in every dialog, `inert` off-screen drawer, visible focus rings, labelled controls, and full support for `prefers-reduced-motion`.

## How it's built

- `context/`: preferences (theme, cursor, language), toasts, inventory (with admin overrides) and shop state (wishlist, garage, compare, recently viewed).
- `lib/enquiry-schema.ts`: one Zod schema shared by the form (inline errors) and `/api/enquiries` (server validation).
- `app/api/finder/route.ts`: Claude call using `betaZodOutputFormat` for typed output, a server-side refusal fallback, and a local fallback when no key is set or the API errors.
- `data/cars.ts`: the sample inventory, including approximate performance figures.
- `tests/site.spec.ts` and `.github/workflows/ci.yml`: Playwright suite run in CI on every push and pull request.

## Notes

- Vehicle photos are model references from Wikimedia Commons, credited on each car page.
- The in-memory rate limiter on `/api/enquiries` is per server instance; use a shared store such as Upstash Redis for real traffic.
