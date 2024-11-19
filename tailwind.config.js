const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        background: "#1e1e1e",
        foreground: "#ffffffde",
        "my-grey-100": "#f0f0f0",
        "my-grey-200": "#d9d9d9",
        "my-grey-300": "#cfcfcf",
        "my-grey-400": "#8c8c8c",
        "my-grey-500": "#474747",
        "my-grey-600": "#323232",
        "my-grey-700": "#242424",
        "my-grey-800": "#1a1a1a",
        "my-grey-900": "#151515",
        "my-maroon": "#341a1f",
        "primary-color": "#cf2642",
        "highlight-color": "#e9ef8d",
        "primary-light": "#f24a66",
      },
      fontSize: {
        'xxs': '0.6rem', // Custom smaller size
      },
    },
  },
  plugins: [flowbite.plugin()],
};
