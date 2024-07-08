/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#311E10',
        primary: '#DD6031',
        secondary: '#EABE7C',
        olive: '#D9DD92',
        offwhite: '#ECE4B7',
        grayscale: '#EDEADA',
      },
    },
  },
  plugins: [],
}