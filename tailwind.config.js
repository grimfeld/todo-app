module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'gray-blue': {
          100: 'hsl(0, 0%, 98%)',
          200: 'hsl(236, 33%, 92%)',
          300: 'hsl(234, 39%, 85%)',
          400: 'hsl(233, 11%, 84%)',
          500: 'hsl(236, 9%, 61%)',
          600: 'hsl(234, 11%, 52%)',
          700: 'hsl(235, 19%, 35%)',
          800: 'hsl(233, 14%, 35%)',
          900: 'hsl(237, 14%, 26%)',
        },
        'background': {
          100: 'hsl(0,0%, 100%)',
          200: 'hsl(0, 0%, 95%)',
          800: 'hsl(235, 24%, 19%)',
          900: 'hsl(235, 21%, 11%)',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
