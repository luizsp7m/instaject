module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "modal": "rgba(0, 0, 0, 0.40)"
      },

      fontFamily: {
        "poppins": ["Poppins", "sans-serif"]
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
}
