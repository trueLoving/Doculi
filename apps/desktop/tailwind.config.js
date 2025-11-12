/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d8ff',
          300: '#a4beff',
          400: '#8195ff',
          500: '#6370ff',
          600: '#4a54ff',
          700: '#3b42ff',
          800: '#3239e6',
          900: '#2f34b8',
        },
        gradient: {
          from: '#8B5CF6',
          to: '#6366F1',
        },
      },
    },
  },
  plugins: [],
};
