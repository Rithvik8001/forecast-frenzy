module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        "apple-blue": "#007AFF",
        "apple-green": "#34C759",
        "apple-indigo": "#5856D6",
        "apple-orange": "#FF9500",
        "apple-pink": "#FF2D55",
        "apple-purple": "#AF52DE",
        "apple-red": "#FF3B30",
        "apple-teal": "#5AC8FA",
        "apple-yellow": "#FFCC00",
      },
    },
  },
  plugins: [],
};
