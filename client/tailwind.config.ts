const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  attributify: true,
  safelist: [
    "bg-[#FEE4CB]",
    "bg-[#FF942E]",
    "bg-[#E9E7FD]",
    "bg-[#4F3FF0]",
    "bg-[#DBF6FD]",
    "bg-[#096C86]",
    "bg-[#FFD3E2]",
    "bg-[#DF3670]",
    "bg-[#C8F7DC]",
    "bg-[#34C471]",
    "bg-[#D5DEFF]",
    "bg-[#4067F9]",
  ],
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
