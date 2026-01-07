/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
// tailwind.config.js
theme: {
  extend: {
    animation: {
      fadeIn: "fadeIn 1.5s ease-in-out",
      slideUp: "slideUp 1.2s ease-out",
      textGlow: "textGlow 2.5s ease-in-out infinite",
    },
    keyframes: {
      textGlow: {
        "0%, 100%": { textShadow: "0 0 8px #7EFF3D" },
        "50%": { textShadow: "0 0 18px #7EFF3D" },
      },
      fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      slideUp: { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
    },
  },
},

  plugins: [],
}

