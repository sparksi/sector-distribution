// convert ttf in src/fonts to all websafe font variations

const Fontmin = require('fontmin');
const fs = require('fs');
const path = require('path');

const OUT_DIR = `dist/fonts`
 
const fontmin = new Fontmin()
    .src('src/fonts/*.ttf')
    .dest(OUT_DIR)
    .use(Fontmin.ttf2woff({
        deflate: true
    }))
    .use(Fontmin.ttf2woff2({
        deflate: true
    }))
    .use(Fontmin.ttf2eot());


fontmin.run(async (err, files) => {
    if (err) {
        throw err;
    }
     
    const dist = files.map(file => {
        const { history } = {...file};
        return history.find(f => f.includes('/dist/'));
    })

    const woff2 = dist.filter(file => file.includes('woff2')).map(file => `${OUT_DIR}/${path.basename(file)}`)

    if(woff2.length > 0) {
        await fs.writeFile(`./${OUT_DIR}/preload-fonts.yaml`, `fonts:\n - ${woff2.join(`\n - `)}`, () => {
            console.log(`🆕 written ${OUT_DIR}/preload-fonts.yaml for improved font preloading`)
        });
    }

});
