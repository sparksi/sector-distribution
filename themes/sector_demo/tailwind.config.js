/** @type {import('tailwindcss').Config} */

import { DefaultColors } from 'tailwindcss/types/generated/colors';

const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  darkMode: 'class',
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
        brand: 'oklch(91.91% 0.22 102.16)',
        'ss-primary': `var(--primary, ${colors.sky['500']})`,
        alert: `var(--alert, ${colors.orange["800"]})`,
        notice: `var(--alert, ${colors.amber["700"]})`,
        highlight: `var(--alert, ${colors.amber["100"]})`,
      },
      fontFamily: {
        custom: ['var(--custom-font)'],
        'custom-alt': ['var(--custom-font-alternate)'],
        'custom-display': ['var(--custom-display)'],
      },
      fontSize: {
        'flexi-1': 'clamp(24px, 10vmax, 52px)',
      },
      keyframes: {
        fadeInUp: {
          from: { transform: 'translateY(1em)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
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