export type Lang = 'en' | 'pcm'

/** English / Nigerian Pidgin strings for the site chrome and key calls to action. */
const dict = {
  'nav.showroom': { en: 'Showroom', pcm: 'Showroom' },
  'nav.arrivals': { en: 'New arrivals', pcm: 'New motor dem' },
  'nav.finder': { en: 'Find my car', pcm: 'Find my motor' },
  'nav.compare': { en: 'Compare', pcm: 'Compare' },
  'nav.build': { en: 'Build & price', pcm: 'Build your own' },
  'nav.ownership': { en: 'Ownership', pcm: 'For owners' },
  'nav.discover': { en: 'Discover', pcm: 'Check am out' },
  'nav.sell': { en: 'Sell / trade-in', pcm: 'Sell your motor' },
  'nav.financing': { en: 'Financing', pcm: 'Pay small small' },
  'nav.about': { en: 'About', pcm: 'About us' },
  'nav.contact': { en: 'Contact us', pcm: 'Holla us' },
  'hero.eyebrow': { en: 'Luxury automotive · Nigeria', pcm: 'Correct motor · Naija' },
  'hero.title': { en: 'Find the car that finally feels like yours.', pcm: 'Find the motor wey go sweet your belle.' },
  'hero.body': { en: 'Explore Mercedes-AMG, Lexus, Range Rover and more. Compare, configure, estimate repayments and book a private viewing — all in one place.', pcm: 'Check Mercedes-AMG, Lexus, Range Rover and plenty more. Compare dem, choose colour, calculate how you go pay, then book viewing — everything dey here.' },
  'hero.browse': { en: 'Browse the collection', pcm: 'Check all the motor' },
  'hero.quiz': { en: 'Take the 60-second quiz', pcm: 'Answer 5 quick question' },
  'search.cta': { en: 'Search cars', pcm: 'Find am' },
  'card.view': { en: 'View', pcm: 'Check am' },
  'cta.reserve': { en: 'Reserve this car', pcm: 'Hold this motor for me' },
  'cta.viewing': { en: 'Book a viewing', pcm: 'Make I come see am' },
  'cta.whatsapp': { en: 'Enquire on WhatsApp', pcm: 'Talk us for WhatsApp' },
  'cta.wishlist': { en: 'Save to wishlist', pcm: 'Keep am for later' },
  'cta.saved': { en: 'Saved to wishlist', pcm: 'E don enter wishlist' },
  'cta.garage': { en: 'Add to garage', pcm: 'Put am for garage' },
  'cta.compare': { en: 'Compare', pcm: 'Compare' },
  'footer.tagline': { en: 'A considered way to discover your next car.', pcm: 'Better way to find your next motor.' },
  'toast.wishlistAdd': { en: 'Saved to wishlist', pcm: 'E don enter wishlist' },
  'toast.wishlistRemove': { en: 'Removed from wishlist', pcm: 'We don comot am from wishlist' },
  'toast.garageAdd': { en: 'Added to garage', pcm: 'E don enter garage' },
  'toast.garageRemove': { en: 'Removed from garage', pcm: 'We don comot am from garage' },
  'toast.compareAdd': { en: 'Added to comparison', pcm: 'E don join compare' },
  'toast.compareRemove': { en: 'Removed from comparison', pcm: 'We don comot am from compare' },
  'toast.compareFull': { en: 'You can compare up to 3 cars', pcm: 'Na only 3 motor you fit compare' },
  'toast.undo': { en: 'Undo', pcm: 'Return am' },
  'settings.title': { en: 'Preferences', pcm: 'Settings' },
  'settings.theme': { en: 'Theme', pcm: 'Colour' },
  'settings.cursor': { en: 'Cursor', pcm: 'Cursor' },
  'settings.language': { en: 'Language', pcm: 'Language' },
} as const

export type I18nKey = keyof typeof dict

export function translate(lang: Lang, key: I18nKey) {
  return dict[key][lang] ?? dict[key].en
}
