import { parentPort, workerData } from 'node:worker_threads'
import chalk from 'chalk';
import Fontmin from 'fontmin';
import { copyFile } from 'node:fs/promises';
import p from 'node:path';
import { glob } from 'glob';

const fonts = async (fontSourceDirectory) => {
  const files = await glob(fontSourceDirectory)

    return await Promise.all(files.map(async path => {
      const source = p.parse(path);
      const destination = source.dir.replace('src', 'dist')
      const fontmin =
      source.ext === 'woff2'
        ? new Fontmin().src([source.dir, source.base].join('/')).dest(destination)
        : new Fontmin()
            .src([source.dir, source.base].join('/'))
            .dest(destination)
            .use(
              Fontmin.ttf2woff2({
                deflate: true,
              })
            );

        return await new Promise((resolve, reject) => {
          fontmin.run((err, files) => {
            if (err) {
              throw err
              reject(err);
            }
            resolve(files);
            console.log(
              chalk
                .hex('#ff6910')
                .bold(`fontmin ${`${destination}/${source.name}.woff2`}`)
            );
          });
        });
    }))
  };

fonts(workerData).then(async (response) => {
    await copyFile('./node_modules/@material-symbols/font-400/material-symbols-sharp.woff2', `./dist/fonts/material-symbols-sharp.woff2`).catch(e => console.error(e)),
    parentPort.postMessage(response)
}).catch(error => {
  console.log(error);
})