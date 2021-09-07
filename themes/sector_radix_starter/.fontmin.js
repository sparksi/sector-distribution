const Fontmin = require('fontmin');
const fs = require('fs');
const path = require('path');

const OUT_DIR = `dist/fonts`


// Drop ttf files into src/fonts, web-safe variants will be created and copied to dist/fonts
const createWebfonts = new Fontmin()
    .src('src/fonts/*.ttf')
    .dest(OUT_DIR)
    .use(Fontmin.ttf2woff({
        deflate: true
    }))
    .use(Fontmin.ttf2woff2({
        deflate: true
    }))
    .use(Fontmin.ttf2eot());


// If you already have woff2 files, drop them into src/fonts and this will copy them to dist/fonts
const copyWebfonts = new Fontmin()
    .src('src/fonts/*.woff2')
    .dest(OUT_DIR)


Promise.all([
    new Promise((resolve, reject) => {
        createWebfonts.run((err, files) => {
            if (err) {
                reject(err);
            }
            resolve(files)
        })
    }),
    new Promise((resolve, reject) => {
        copyWebfonts.run((err, files) => {
            if (err) {
                reject(err);
            }
            resolve(files)
        })
    })
]).then(async ([ ttf, woff ]) => {
    const merged = [...ttf, ...woff];

    const dist = merged.map(file => {
        const { history } = {...file};
        return history.find(f => f.includes('/dist/'));
    })

    const woff2 = dist.filter(file => file.includes('woff2')).map(file => `${OUT_DIR}/${path.basename(file)}`)

    if(woff2.length > 0) {
        await fs.writeFile(`./${OUT_DIR}/preload-fonts.yaml`, `fonts:\n - ${woff2.join(`\n - `)}`, () => {
            console.log(`🆕 written ${OUT_DIR}/preload-fonts.yaml for improved font preloading`)
        });
    }
})
