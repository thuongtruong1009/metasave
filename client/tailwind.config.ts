const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  attributify: true,
  theme: {
    fontFamily: {
      sans: ["Inter", "Sans-serif"],
    },
    extend: {
      colors: {
        primary: colors.purple[500],
      },
    },
  },
};
