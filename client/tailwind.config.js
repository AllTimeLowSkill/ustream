/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: {
        100: "#d3ccda",
        200: "#a799b5",
        300: "#7c6690",
        400: "#50336b",
        500: "#240046",
        600: "#1d0038",
        700: "#16002a",
        800: "#0e001c",
        900: "#07000e"
      },
      accent: '#FFFFFF',
      gradient_start: '#3C096C',
      gradient_end: '#5A189A',
      black: '#000000B2',
      hover_bg: '#9D4EDD'
    },
    
  },
  plugins: [],
}

