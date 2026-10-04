const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './*.{ts,tsx}', './components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        navy: '#0a192f',
        lightNavy: '#112240',
        lightestNavy: '#233554',
        slate: { ...colors.slate, DEFAULT: '#8892b0' },
        lightSlate: '#a8b2d1',
        lightestSlate: '#ccd6f6',
        white: '#e6f1ff',
        teal: { ...colors.teal, DEFAULT: '#64ffda' },
        tealTint: 'rgba(100, 255, 218, 0.1)',
      },
    },
  },
  plugins: [],
};
