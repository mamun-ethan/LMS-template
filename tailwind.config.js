/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./node_modules/flowbite/**/*.js"],
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
      translate: {
        "40p": "40%", // Add custom translate value
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};
