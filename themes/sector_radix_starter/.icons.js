const fs = require('fs');


const favicons = require('favicons'),
    source = 'favicon.svg',                     // Source image(s). `string`, `buffer` or array of `string`
    configuration = {          
        path: "/",
        appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
        icons: {
          android: false,              // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          favicons: true,             // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          windows: true,              // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          yandex: false                // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        }
    },
    callback = function (error, response) {
        if (error) {
            console.log(error.message); // Error description e.g. "An unknown error has occurred"
            return;
        }
        
        //console.log(response.images);   // Array of { name: string, contents: <buffer> }
        
        response.images.forEach(({ name, contents })  => {
          console.log(`writing ${name}...`);
          fs.writeFile(`./dist/favicons/${name}`, contents, (err) => {
            if (err) return console.log(err);
          });
        })
    };
 
favicons(source, configuration, callback);