/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/js/index.js",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'moderateCyan': 'hsl(176, 50%, 47%)',
      'darkCyan': 'hsl(176, 72%, 28%)',
      'darkGray': 'hsl(0, 0%, 48%)',
      'white': 'hsl(100, 100, 100)',
      'black': 'hsl(0, 0, 0)',
    },
    extend: {
      fontFamily: {
        SpaceMono: ["Commissioner", "serif"],
      },
      fontSize: {
                '2xl': '1.75rem',
                '3xl': '2rem',
            },
    },
  },
  plugins: [],
}