/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all JS/TS files in src folder
    "./public/**/*.html", // Include HTML files if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
