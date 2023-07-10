/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    './templates/**/*.{html,twig}',
    './src/**/*.{html,twig}',
    './components/**/*.{html,twig}',
    '../sector/src/layout/*/*.{html,twig}',
    '../sector/templates/**/*.{html,twig}',
    '../sector/src/components/**/*.{html,twig}',
    '../sector/components/**/*.{html,twig}',
    './node_modules/safelist.txt',
  ],
  theme: {
    container: {
      center: true,
      padding: 'var(--container-padding, 2rem)',
    },
    extend: {
      breakpoints: {
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      fontFamily: {
        custom: ['var(--custom-font)'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography')({
      className: 'wysiwyg',
    }),
    require('tailwind-safelist-generator')({
      path: 'node_modules/safelist.txt',
      patterns: require('./build/tailwind-safelist'),
    }),
  ],
};
