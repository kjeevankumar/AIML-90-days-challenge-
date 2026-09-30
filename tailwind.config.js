/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          'blue-dark': '#1D4ED8',
          'blue-light': '#EFF6FF',
          yellow: '#F4B400',
          'yellow-light': '#FEF9C3',
          green: '#16A34A',
          'green-light': '#DCFCE7',
          red: '#DC2626',
          'red-light': '#FEE2E2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
