/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif'],
        PlayfairDisplay: ['Playfair Display', 'sans-serif'],
      },
      colors: {
        'tca-color-hover': '#DAA14C',
        'tca-color-button': '#DAA14C',
        'tca-color-button-hover': '#E0B069',
        'tca-color-body': '#333',
        'tca-color-section-bg': '#F6F4F0',
        'tca-green': '#538D1A',
        'tca-color-star': '#daa14c',
        'tca-footer-bg': '#6C4C2B',
        'tca-stats-title': '#232323',
        'tca-stats-desc': '#6e6e6e',
        'tca-breadcrumb-bg': '#F5F7FA',
        'tca-product-price-bg': '#F5F7FA',
        'tca-product-background': '#F5F7FA',
        'tca-btn-red': '#e64545',

      },
      fontSize: {
        'xlsize': ['59px', '65px'],  // [fontSize, lineHeight]
        'lgsize': ['47px', '53px'],
        'mdsize': ['40px', '46px'],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('tailwindcss-animated'),
    require('preline/plugin'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

