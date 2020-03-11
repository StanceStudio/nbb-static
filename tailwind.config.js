// Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L5
const defaultTheme = require("tailwindcss/defaultTheme");

const colors = {
  navy: "#382DCB",
  dark: "#1D1D1B",
  black: "#000000",
  light: "#9B9B9B",
  white: "#FFFFFF",
  lavender: "#DAD5D6",
  pink: "#FF40B4",
  lightgreen: "#97A793",
  green: "#00514D",
  sand: "#E5E4E4",
};

module.exports = {
  corePlugins: {
    container: false
  },
  theme: {
    cursor: {
      none: "none"
    },
    fontFamily: {
      display: ['"FoundersGrotesk"', "sans-serif"],
      body: ['"FoundersGrotesk"', "sans-serif"],
      sans: ['"FoundersGrotesk"', ...defaultTheme.fontFamily.sans],
      serif: ['"Ogg"', "serif"],
      mono: [...defaultTheme.fontFamily.mono]
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2.6rem",
      "3xl": "3rem",
      "4xl": "4.65rem",
      "5xl": "6.25rem",
      "6xl": "8.85rem"
    },
    extend: {
      spacing: {
        "12": "4.25rem",
        "14": "5.5rem",
        "18": "6rem",
        "20": "8.5rem",
        "22": "10rem",
        "24": "12rem",
        "26": "14rem",
      },
      colors: colors,
      opacity: {
        "90": ".9"
      },
      maxWidth: {
        container: "1280px"
      },
      screens: {
        xxl: "1900px",
        xxxl: "3000px"
      }
    }
  },
  variants: {
    opacity: ["responsive", "hover", "focus"]
  },
  plugins: []
};
