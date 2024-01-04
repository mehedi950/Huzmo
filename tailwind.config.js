/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color_primary: "#164B60",
        color_secondary: "#1B6B93",
        color_body: "#4FC0D0",
        color_light: "#3F2E3E",
        color_white: "#ffffff",
        color_dark: "#001524",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      Oswald: ["Oswald", "sans-serif"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    darkTheme: "light",
  },
};
