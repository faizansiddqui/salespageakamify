/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <-- enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.45s ease-out',
      },
      transitionTimingFunction: {
        'soft': 'cubic-bezier(.2,.9,.2,1)',
      }
    },
  },
  plugins: [],
};