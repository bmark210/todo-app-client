export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    screens: {
      sm: "360px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      backdropBlur: {
        "3xl": "3rem",
      },
      backdropOpacity: {
        50: "0.5",
      },
    },
    colors: {
      black: { dark: "#000", faded: "#00000059" },
      purple: "#7e5bef",
      orange: { primary: "#fb923c" },
      green: { ligth: "#bbf7d0", primary: "#86efac", secondary: "#4ade80" },
      blue: { ligth: "#e0f2fe" },
      red: { light: "#fecaca", primary: "#f87171" },
      white: "#ffffff",
      yellow: { light: "#fef9c3", primary: "#facc15" },
      gray: {
        primary: "#e2e8f0",
        secondary: "#cbd5e0",
        dark: "#4a5568",
        faded: "#00000059",
      },
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    shadow: {
      "shadow-sm": "box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)",
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
};
