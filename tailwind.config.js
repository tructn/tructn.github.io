const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        teal: colors.teal,
        blueGray: colors.blueGray,
        violet: colors.violet
      }
    },
    fontFamily: {
      'display': ['Space Mono']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}