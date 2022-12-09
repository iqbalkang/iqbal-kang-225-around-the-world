/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        josefin: ['Josefin Sans', 'sans-serif'],
      },
      colors: {
        accent: '#FF7474',
        ['dark-yellow']: '#F9C80E',
        ['dark-gray']: '#444',
      },
    },
  },
  plugins: [],
}
