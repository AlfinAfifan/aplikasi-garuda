/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { first: "#06163a", second: "#1e3363", third: "#284382" },
      fontFamily: {
        montserrat: ['"Montserrat"', "sans-serif"],
        roboto: ['"Roboto"', "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
