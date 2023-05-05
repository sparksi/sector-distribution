/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    "./templates/**/*.{html,twig}",
    "./src/**/*.{html,twig}",
    "../sector/templates/**/*.{html,twig}",
    "../sector/src/**/*.{html,twig}",
    "./safelist.txt"
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
        '4xl': '2560px'
      },
      fontFamily: {
        'custom': ['var(--custom-font)'],
        //'custom-alt': ['var(--custom-font-alternate)'],
      },
      fontSize: {
        'flexi-1':  'clamp(24px, 10vmax, 52px)'
      },
      keyframes: {
        fadeInUp: {
          'from': { transform: 'translateY(1em)', opacity: 0},
          'to': { transform: 'translateY(0)', opacity: 1}
        }
      },
      animation: {
        'alert': 'fadeInUp .35s ease'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography')({
      className: 'wysiwyg',
    }),
    require('tailwind-safelist-generator')({
      path: 'safelist.txt',
      patterns: require('./build/tailwind-safelist')
    })
  ],
}

