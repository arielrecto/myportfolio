/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0F16",       // page background
        surface: "#121823",   // cards
        raised: "#18202D",    // hover / inputs
        line: "#232C3B",      // borders
        content: "#E7EBF1",   // primary text
        muted: "#8E9AAD",     // secondary text
        accent: {
          DEFAULT: "#5FC9BE",
          strong: "#3FB3A7",
          soft: "rgba(95, 201, 190, 0.12)",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      maxWidth: {
        page: "72rem",
      },
    },
  },
  plugins: [],
}
