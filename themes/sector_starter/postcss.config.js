module.exports = ctx => ({
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "last 2 version"
      ],
      grid : true
    },
    "postcss-inline-svg": {
      "xmlns": true
    }
  }
})
