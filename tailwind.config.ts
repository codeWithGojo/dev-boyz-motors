import type { Config } from 'tailwindcss'
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { canvas: '#EDEBE7', card: '#FBFBFA', ink: '#111111', bronze: '#B08D57' },
      borderRadius: { '4xl': '2rem' }
    }
  },
  plugins: []
} satisfies Config
