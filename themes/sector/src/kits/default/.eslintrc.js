/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018, // Put whatever version you want here
  },
  env: {
    browser: true,
  },
};
