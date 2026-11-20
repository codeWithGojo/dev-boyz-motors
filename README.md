# DEV BOYZ MOTORS

Responsive luxury-car reference showroom for the Nigerian market. Built with Next.js App Router, TypeScript, Tailwind CSS and React. The premium cream / charcoal / bronze visual language is intentionally kept minimal.

## Quick start

```bash
npm install
npm run dev
npm run build
```

## Business configuration

Set the public contact information and optional email delivery configuration in Vercel Project Settings → Environment Variables. See `.env.example` for the exact names.

- `NEXT_PUBLIC_DEALERSHIP_WHATSAPP`: international digits only, no `+`, for WhatsApp deep links.
- `NEXT_PUBLIC_DEALERSHIP_PHONE`: displayed phone number.
- `NEXT_PUBLIC_DEALERSHIP_EMAIL`: displayed contact email.
- `NEXT_PUBLIC_SHOWROOM_ADDRESS`: display only when the physical location is verified.
- `NEXT_PUBLIC_SHOWROOM_HOURS`: operating hours, otherwise viewings by appointment.
- `ENQUIRY_TO_EMAIL`, `RESEND_FROM_EMAIL`, `RESEND_API_KEY`: optional server-side email delivery.

**Forms**: `/api/enquiries` validates, normalizes, rate-limits requests and sends an email via Resend when configured. Without valid email delivery configuration, the form offers a *Continue to WhatsApp* link with the prefilled details; the user must press Send inside WhatsApp. The UI never falsely confirms a submission or reservation. Always confirm the displayed dealership phone and inbox with the business owner before accepting real enquiries. For higher-volume production use, replace the in-memory rate limiter with a shared store (e.g. Upstash Redis) and monitor Resend errors.

**Important:** The data in `data/cars.ts` is **sample inventory**, with estimated prices and reference imagery sourced from Wikimedia Commons (see `data/reference-photos.ts`). The images depict the corresponding model, **not an exact stock vehicle**. Real listings require permission-cleared photographs of the actual car, VIN, documented condition, duty status, confirmed price, and stock management. Missing images display a neutral placeholder, never another model.

Customer handovers, testimonials, live delivery counts and bank logos are deliberately **not fabricated**. These appear only once genuine business evidence, permissions and agreements are provided.

## Routes

- `/` Home and collection
- `/showroom` Filters by brand, model, condition, transmission and maximum price; sorting
- `/cars/[slug]` Image galleries, wishlist, garage, enquiry modals, finance estimator and WhatsApp
- `/garage` Persistent wishlist / garage / clear actions
- `/sell-your-car` Sell or source enquiry form
- `/financing` Reducing-balance loan estimator with deposits, APR, term and disclosure
- `/contact` Contact details and enquiry form
- `/brands`, `/new-arrivals`, `/about`
- `/checkout` Legacy redirect to `/garage`; no payments or fictitious reservations

## Editing

- Contact settings: `lib/site.ts` and Vercel environment variables
- Model data: `data/cars.ts`
- Model images: `data/reference-photos.ts` (replace all references with photographs of verified real stock)
- Common components: `components/`
- Finance assumptions: `lib/finance.ts`
- Email handler: `app/api/enquiries/route.ts`

Do not accept a financial deposit without establishing payment processing, availability confirmation, legal documentation and operational controls. The site deliberately does not collect deposits or process payments.
