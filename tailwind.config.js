module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(320px, 1fr))',
      },

      colors: {
        "modal": "rgba(0, 0, 0, 0.40)"
      },

      fontFamily: {
        "poppins": ["Poppins", "sans-serif"]
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
  ],
}
