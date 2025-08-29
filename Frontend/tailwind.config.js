/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2', // Vibrant blue
        secondary: '#50C878', // Fresh green
        accent: '#F5A623', // Warm orange
        background: '#1E293B', // Dark slate blue
        text: '#F8FAFC', // Off-white
        lightText: '#CBD5E1', // Light gray
      },
    },
  },
  plugins: [],
}
