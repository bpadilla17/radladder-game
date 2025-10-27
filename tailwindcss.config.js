/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-blue': '#0066CC',
        'success-green': '#10B981',
        'error-red': '#EF4444',
      },
    },
  },
  plugins: [],
}
