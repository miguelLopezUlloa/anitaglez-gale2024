/** @type {import('tailwindcss').Config} */

const flowbite = require('flowbite/plugin');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/flowbite/**/*.js',
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#284756", // Color principal
          dark: "#1f3a42", // Color más oscuro para hover
        },
      },
    },
  },
  plugins: [flowbite],
}
