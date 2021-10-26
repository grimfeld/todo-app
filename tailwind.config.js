module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        global: 'var(--global)',
        blocks: 'var(--blocks)',

      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
