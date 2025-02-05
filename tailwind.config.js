/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFD966',
        secondary: '#f5c638',
        themeblack: '#333333',
        themelight: '#F7F7F7',
        muted: '#555555',
      },
    },
    container: {
      padding: '1rem',
      center: true,
    },
  },
  plugins: [],
};
