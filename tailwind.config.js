/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        hind: ["Hind Siliguri", "sans-serif"],
      },
      colors: {
        bgRed: "rgb(241 241 241)",
        header: "#fff",
        btnYellow: "#ffc000",
      },
    },
  },
  plugins: [],
};
