/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "system-ui", "sans-serif"],
    },
    extend: {
      animation: {
        fade: "fade 0.8s ease-in-out alternate infinite",
        ripple: "ripple 0.8s ease-out",
      },
      keyframes: {
        fade: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
      transitionDelay: {
        "-200": "-0.2s",
        "-400": "-0.4s",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
