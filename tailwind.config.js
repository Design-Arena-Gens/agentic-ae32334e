/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f6ff',
          100: '#ebeefe',
          200: '#cdd2fd',
          300: '#aab2fb',
          400: '#7d85f8',
          500: '#4f54f5',
          600: '#3c3fe9',
          700: '#2f31cc',
          800: '#2729a5',
          900: '#232585',
        }
      }
    },
  },
  plugins: [],
};
