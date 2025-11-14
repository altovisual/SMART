/** @type {import('tailwindcss').Config} */
const forms = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');
const aspectRatio = require('@tailwindcss/aspect-ratio');

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF", // soft purple
        accent: "#9FFFE0", // aqua/teal
        background: {
          DEFAULT: "#0F172A", // deep navy fallback
          light: "#F9FAFB",
        },
        gradientFrom: "#A593FF",
        gradientTo: "#4263EB",
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "SF Pro Display", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        grifter: ["Grifter", "sans-serif"],
        aeonik: ["Aeonik", "sans-serif"],
        gilroy: ["Gilroy", "sans-serif"],
      },
      borderRadius: {
        'apple-sm': '10px',   // Small elements (buttons, inputs)
        'apple': '12px',      // Default (cards, containers)
        'apple-lg': '16px',   // Large cards
        'apple-xl': '20px',   // Extra large containers
        'apple-2xl': '24px',  // Hero sections
      }
    },
  },
  plugins: [forms, typography, aspectRatio],
};
