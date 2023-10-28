/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeDown: "fadeDown .3s linear",
      },
      keyframes: {
        fadeDown: {
          "0%": { transform: "translateY(-100%)" },
          "50%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
      width: {
        "475px": "475px",
      },
      height: {
        "475px": "475px",
      },
    },
  },
  plugins: [],
};
