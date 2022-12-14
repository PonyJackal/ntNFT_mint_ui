module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{scss,css}",
  ],
  theme: {
    extend: {
      opacity: {
        15: ".15",
      },
      spacing: {
        16: "16px",
        18: "18px",
        26: "26px",
        30: "30px",
        46: "46px",
        50: "50px",
        70: "70px",
        74: "74px",
        90: "90px",
        100: "100px",
        140: "140px",
        500: "500px",
        900: "900px",
      },
    },
    fontFamily: {
      ibm: ["IBM Plex Mono"],
      orbitron: ["Orbitron"],
      rubik: ["Rubik"],
    },
    fontSize: {
      "hero-title-sm": ["20px", "26px"],
      "hero-title-md": ["20px", "26px"],
      "hero-title-lg": ["38px", "52px"],
      "hero-desc-sm": ["13px", "19px"],
      "hero-desc-lg": ["17px", "25px"],
      "timeline-date-sm": ["13px", "17px"],
      "timeline-date-lg": ["15px", "20px"],
      "timeline-title-sm": ["18px", "23px"],
      "timeline-title-lg": ["25px", "32px"],
      "timeline-desc-sm": ["13px", "19px"],
      "timeline-desc-lg": ["16px", "24px"],
      "benefits-title-sm": ["16px", "20px"],
      "benefits-title-lg": ["20px", "26px"],
      "benefits-desc-sm": ["12px", "18px"],
      "benefits-desc-lg": ["16px", "24px"],
      "primary-button-sm": ["16px", "20px"],
      "primary-button-lg": ["20px", "26px"],
      "secondary-button": ["15px", "20px"],
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    minWidth: {
      200: "200px",
    },
    maxWidth: {
      280: "280px",
      300: "300px",
      400: "400px",
      720: "720px",
      780: "780px",
      960: "960px",
      1470: "1470px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFF",
      black: "#000",
      "reef-green": "#B2FFA5",
      "gp-red": "#dc2626",
      "mint-green": "#A4FF6C",
      "harlequin-green": "#4DF631",
      "laurel-green": "#107400",
      "camarone-green": "#005702",
      woodsmoke: {
        100: "#191F1F",
        200: "#161E1E",
        300: "#0E1414",
      },
    },
  },
};
