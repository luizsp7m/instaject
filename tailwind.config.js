module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "grayish": {
          700: "#243447",
          900: "#141D26",
        },
      },

      fontFamily: {
        "poppins": ["Poppins", "sans-serif"]
      },

      gridTemplateColumns: {
        "feed-layout": "repeat(auto-fill, minmax(330px, 1fr))",
      },

      keyframes: {
        topBottom: {
          "from": { transform: "translateY(-1rem)", opacity: 0 },
          "to": { transform: "translateY(0rem)", opacity: 1 }
        }
      },

      animation: {
        "fadeIn": "topBottom 0.30s"
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("tailwindcss-scoped-groups")({
      groups: ["one", "two"],
    }),
  ],
}
