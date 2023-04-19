/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '576px',

      md: '768px',

      lg: '1176px',
    },
    extend: {
      fontFamily: {
        josefin: ['Josefin Sans', 'sans-serif'],
      },
      colors: {
        accent: '#FF7474',
        'dark-yellow': '#F9C80E',
        'dark-gray': '#444',
        'light-gray': '#aaa',
        'off-white': '#fffafa',
        'dark-brown': '#3E1E1E',
      },
      animation: {
        loading: 'loading 1s infinite',
      },
      keyframes: {
        loading: {
          '0%, 100%': {
            transform: 'translateX(-100%) rotate(45deg)',
          },
          '50%': {
            transform: 'translateX(100%) rotate(45deg)',
          },
        },
      },
    },
  },
  plugins: [],
}
