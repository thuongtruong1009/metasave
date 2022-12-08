const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  attributify: true,
  safelist: [
    // project colors
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
    // event colors
    "bg-[#F5CEC7]",
    "bg-[#FFDCA2]",
    "bg-[#E0ECDE]",
    "bg-[#BCE6FF]",
    "bg-[#CFF4D2]",
    "bg-[#FFCAD4]",
    "bg-[#DDDDDA]",
    "bg-[#E8B7D4]",
    "bg-[#E4C7B7]",
    "bg-[#F9E2AE]",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "Sans-serif"],
    },
    extend: {
      colors: {
        primary: colors.purple[500],
      },
      spacing: {
        "128": "32rem",
      },
      boxShadow: {
        input:
          "0 4px 11px -2px rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%)",
      },
    },
  },
};
