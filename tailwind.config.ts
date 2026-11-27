import type { Config } from 'tailwindcss'

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{ts,tsx}', './context/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: token('canvas'),
        card: token('card'),
        surface: token('surface'),
        ink: token('ink'),
        muted: token('muted'),
        line: token('line'),
        bronze: 'rgb(var(--accent))',
        night: token('night'),
      },
      fontFamily: { display: ['var(--font-display)', 'Didot', 'Georgia', 'serif'] },
      borderRadius: { '4xl': '2rem' },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
        'ken-burns': { from: { transform: 'scale(1)' }, to: { transform: 'scale(1.12) translate(-1.5%, -1%)' } },
        'pop-in': { '0%': { opacity: '0', transform: 'scale(.6)' }, '70%': { transform: 'scale(1.08)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'toast-in': { from: { opacity: '0', transform: 'translateY(16px) scale(.97)' }, to: { opacity: '1', transform: 'none' } },
        'draw': { to: { strokeDashoffset: '0' } },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.2,.7,.2,1) both',
        'ken-burns': 'ken-burns 18s ease-in-out infinite alternate',
        'pop-in': 'pop-in .55s cubic-bezier(.2,.8,.2,1.2) both',
        shimmer: 'shimmer 1.4s infinite',
        'toast-in': 'toast-in .35s cubic-bezier(.2,.8,.2,1) both',
        draw: 'draw .8s ease-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config
