/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        hind: ["Hind Siliguri", "sans-serif"],
      },
      colors: {
        bgColor: "rgb(241 241 241)",
        header: "#fff",
        primary: "rgb(32 0 213)",
      },
    },
  },
  plugins: [],
};
