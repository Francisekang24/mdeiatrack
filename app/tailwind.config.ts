/** @type {import('tailwindcss').Config} */
function getColorScale(name: string) {
  const scale: Record<string | number, string> = {};
  for (let i = 1; i <= 12; i++) {
    scale[i] = `var(--${name}-${i})`;
    scale[`a${i}`] = `var(--${name}-a${i})`;
  }
  return scale;
}

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: getColorScale("tomato"),
        gray: getColorScale("gray"),
      },
    },
  },
  plugins: [],
};