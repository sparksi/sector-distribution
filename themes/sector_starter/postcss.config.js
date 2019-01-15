module.exports = ctx => ({
  plugins: {
    autoprefixer: {
      browsers: [
        "last 2 version"
      ],
      grid : true
    },
    "postcss-inline-svg": {
      "xmlns": true
    }
  }
})
