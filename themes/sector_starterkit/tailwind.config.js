/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

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
    '../../../profiles/contrib/sector-distribution/themes/sector/src/components/**/*.{html,twig}',
    '../../../profiles/contrib/sector-distribution/themes/sector/components/**/*.{html,twig}',
    '../../../profiles/contrib/sector-distribution/themes/sector/src/layout/*/*.{html,twig}',
    '../../../profiles/contrib/sector-distribution/themes/sector/templates/**/*.{html,twig}',
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
      colors: {
        primary: `var(--primary, ${colors.gray['500']})`,
        alert: `var(--alert, ${colors.orange["800"]})`,
        notice: `var(--alert, ${colors.amber["700"]})`,
        highlight: `var(--alert, ${colors.amber["100"]})`,
      },
      fontFamily: {
        custom: ['var(--custom-font)'],
      },
      animation: {
        alert: 'fadeInUp .35s ease',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms')({
      strategy: 'base',
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
