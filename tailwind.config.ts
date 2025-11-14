/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      animation: {
        background: "gradientBG 10s ease infinite",
        blink: "blink 1s step-start infinite",
      },
      keyframes: {
        gradientBG: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },

      backgroundSize: {
        "200": "200% 200%",
      },

      boxShadow: {
        glow: "0 0 15px rgba(34,211,238,0.6)",
      },

      colors: {
        glass: "rgba(20,20,20,0.85)",

        "ios-bg": "#000000",
        "ios-bg-secondary": "#1C1C1E",
        "ios-bg-tertiary": "#2C2C2E",     

        "ios-label": "#EAEAEA",
        "ios-label-secondary": "#8E8E93",

        "ios-blue": "#0A84FF",
        "ios-green": "#34C759",
        "ios-red": "#FF3B30",

        "ios-separator": "rgba(84,84,88,0.65)",
        "ios-progress-bg": "#3A3A3C",
      },

      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
