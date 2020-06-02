// convert ttf in src/fonts to all websafe font variations

const Fontmin = require('fontmin');
 
const fontmin = new Fontmin()
    .src('src/fonts/*.ttf')
    .dest('dist/fonts')
    .use(Fontmin.ttf2woff({
        deflate: true
    }))
    .use(Fontmin.ttf2woff2({
        deflate: true
    }))
    .use(Fontmin.ttf2eot());


fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }
     
    //console.log(files);
});