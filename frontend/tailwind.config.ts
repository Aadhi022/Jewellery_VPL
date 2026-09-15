import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',
        cream: '#F5F0E8',
        charcoal: {
          DEFAULT: '#1C1C1C',
          md: '#3A3A3A',
          lt: '#6B6B6B',
        },
        'lavender-gray': '#F0EEF4',
        gold: {
          DEFAULT: '#B8972E',
          lt: '#D4AF6A',
          dk: '#8B6914',
        },
        border: '#E8E2D9',
        'dark-bar': '#1A1A1A',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
export default config
