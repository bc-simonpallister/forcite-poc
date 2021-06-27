module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      'primary': '#00001e'
     }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
