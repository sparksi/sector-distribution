const icongen = require('icon-gen')
const fs = require('fs');

icongen('./favicon.svg', './dist/favicons', { 
    report: false,
    favicon: {
        name: 'favicon-',
        pngSizes: [32, 72, 96, 180, 192, 512],
        icoSizes: [16, 24, 32]
    }
})
  .then((results) => {
    fs.writeFile(`./dist/manifest.webmanifest`, JSON.stringify({
        "icons": [
          { "src": "favicons/favicon-192.png", "type": "image/png", "sizes": "192x192" },
          { "src": "favicons/favicon-512.png", "type": "image/png", "sizes": "512x512" }
        ]
    }), (done => console.log(`Ⓜ️  Generated icons`)))
  })
  .catch((err) => {
    console.error(err)
  })