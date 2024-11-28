/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#d94445",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        poppinsMedium: ["Poppins Medium", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("daisyui")],
};
