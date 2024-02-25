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
        n: {
          900: '#000000',
          800: '#191919',
          700: '#333333',
          600: '#4D4D4D',
          500: '#666666',
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
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
