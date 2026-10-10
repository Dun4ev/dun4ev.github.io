const colors = require('tailwindcss/colors');
const themeColor = (name) => `rgb(var(--${name}) / <alpha-value>)`;
const themeScale = (name) => Object.fromEntries(Object.keys(colors[name]).map((shade) => [shade, themeColor(`${name}-${shade}`)]));

module.exports = {
  content: ['./index.html', './*.{ts,tsx}', './components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        navy: themeColor('navy'),
        lightNavy: themeColor('light-navy'),
        lightestNavy: themeColor('lightest-navy'),
        slate: { ...themeScale('slate'), DEFAULT: themeColor('slate') },
        lightSlate: themeColor('light-slate'),
        lightestSlate: themeColor('lightest-slate'),
        white: themeColor('white'),
        teal: { ...themeScale('teal'), DEFAULT: themeColor('teal') },
        cyan: themeScale('cyan'),
        amber: themeScale('amber'),
        tealTint: 'rgb(var(--teal) / 0.1)',
      },
    },
  },
  plugins: [],
};
