/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        theme: {
          DEFAULT: "#C6426E",
          50: "#F1CFDA",
          100: "#ECBFCE",
          200: "#E2A0B6",
          300: "#D9819E",
          400: "#CF6186",
          500: "#C6426E",
          600: "#A03055",
          700: "#75233E",
          800: "#4A1627",
          900: "#1E0910",
          950: "#090305",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
