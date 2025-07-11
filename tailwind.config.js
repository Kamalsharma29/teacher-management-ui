/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // important: must be class-based
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        mono: ['monospace'],
      },
    },
  },
  plugins: [],
};

