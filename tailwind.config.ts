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
          100: '#F9F9F9',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
export default config
