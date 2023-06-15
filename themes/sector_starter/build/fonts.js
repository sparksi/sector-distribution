import Fontmin from 'fontmin';
import chalk from 'chalk';

export const fonts = async (source, destination) => {
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

  await new Promise((resolve, reject) => {
    fontmin.run((err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
  console.log(
    chalk
      .hex('#ff6910')
      .bold(`fontmin ${`${destination}/${source.name}.woff2`}`)
  );
};