/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    './templates/**/*.{html,twig}',
    './src/**/*.{html,twig}',
    '../sector/src/layout/*/*.{html,twig}',
    '../sector/templates/**/*.{html,twig}',
    '../sector/src/components/**/*.{html,twig}',
    './node_modules/safelist.txt',
  ],
  theme: {
    container: {
      center: true,
      padding: 'var(--container-padding, 2rem)',
    },
    extend: {
      colors: {
        brand: 'oklch(91.91% 0.22 102.16)'
      },
      breakpoints: {
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
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
