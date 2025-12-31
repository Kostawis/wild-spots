/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-debug-screens"),
    require("autoprefixer"),
    require("tailwind-scrollbar")({
      preferredStrategy: "pseudoelements",
      nocompatible: true,
    }),
    require("tailwindcss-text-fill"),
    ({ addUtilities }) => {
      addUtilities({
        ".scrollbar-default": {
          "@apply dark:scrollbar-thumb-gray-400 scrollbar-thumb-gray-500 dark:scrollbar-track-gray-800 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full":
            {},
        },
        ".scrollbar-small": {
          "@apply dark:scrollbar-thumb-gray-400 scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700 overflow-y-auto scrollbar-thin":
            {},
        },
      });
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.cyan,
          DEFAULT: colors.cyan[600],
        },
        company: {
          youtube: "#FF0000",
          instagram: "#E1306C",
          facebook: "#4267B2",
        },
        overlay: "rgba(0, 0, 0, 0.4)",
      },
      boxShadow: {
        darkInput: `0 0 0 1000px ${colors.gray[700]} inset`,
        lightInput: `0 0 0 1000px ${colors.gray[50]} inset`,
      },
      width: {
        "almost-full": "calc(100vw - 2rem)",
      },
      minHeight: {
        "full-content": "calc(100vh - 61px - 61px)",
      },
      height: {
        "full-content": "calc(100vh - 61px - 61px)",
      },
      gridTemplateColumns: {
        "auto-fill-96": "repeat(auto-fill, minmax(96px, 1fr))",
        "auto-fit-96": "repeat(auto-fit, minmax(96px, 1fr))",
        "auto-fill-110": "repeat(auto-fill, minmax(110px, 1fr))",
        "auto-fill-280": "repeat(auto-fill, minmax(280px, 1fr))",
        "auto-fill-460": "repeat(auto-fill, minmax(460px, 1fr))",
      },
    },
    fontFamily: {
      body: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
  },
};
