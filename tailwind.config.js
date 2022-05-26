const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                rose: colors.rose,
                teal: colors.teal,
                blueGray: colors.slate,
                violet: colors.violet,
            },
            listStyleType: {
                square: 'square',
                roman: 'upper-roman',
            },
        },
        fontFamily: {
            display: ['Inter'],
            mono: ['Consolas'],
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
