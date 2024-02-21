/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // or 'media' or 'class'
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
            100: '#596773',
            200: '#454F59',
            300: '#38414A',
            400: '#2C333A',
            500: '#282E33',
            600: '#22272B',
            700: '#1D2125',
            800: '#161A1D',
            900: '#101214',
            },
        },
      }
    },
  plugins: ['@tailwindcss/forms'],
}

