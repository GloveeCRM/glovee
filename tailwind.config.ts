import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        n: {
          900: '#000000',
          800: '#191919',
          700: '#333333',
          650: '#404040',
          600: '#4D4D4D',
          500: '#666666',
          450: '#7D7D7D',
          400: '#B1B2B2',
          300: '#D2D3D3',
          200: '#EAEAEA',
          100: '#F1F1EF',
        },
        o: {
          600: '#EC642B',
          500: '#EE783A',
          400: '#F09235',
        },
        b: {
          300: '#95B8E0',
          500: '#4E88CB',
          700: '#396393',
        },
        g: {
          200: '#A5E4BE',
          500: '#4BC97E',
          700: '#3EA669',
          800: '#2F7D4D',
        },
        r: {
          200: '#DEACA7',
          500: '#BD584E',
          700: '#9C4941',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
