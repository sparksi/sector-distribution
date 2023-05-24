import p from 'node:path';
import sass from 'sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import inlineSVG from 'postcss-inline-svg';
import tailwind from 'tailwindcss';
//import outputFiles from 'output-files'
import chalk from 'chalk';
import { mkdir, rm } from 'node:fs';
import * as esbuild from 'esbuild';

import outputFile from 'output-file';
import { fonts, materialSymbolsFont } from './fonts.js';

export const css = async (source, destination, env) => {
  const pre = await sass
    .compileAsync([source.dir, source.base].join('/'), {
      style: env === 'development' ? 'expanded' : 'compressed',
      loadPaths: ['src', 'node_modules'],
      sourceMap: env === 'development' ? true : false,
      //sourceMapIncludeSources: env === 'development' ? true : false,
    })
    .then(({ css }) => {
      return css;
    });
  console.log(
    chalk.hex('#C24C89').bold(`sass ${[source.dir, source.base].join('/')}`)
  );

  if (pre.length === 0) {
    return;
  }

  const post = await postcss([
    autoprefixer,
    inlineSVG({
      paths: ['src/', 'node_modules/@material-symbols/svg-400/sharp'],
    }),
    tailwind(),
  ]).process(pre, {
    from: pre,
  });
  console.log(
    chalk.hex('#0e73d3').bold(`postcss ${[source.dir, source.base].join('/')}`)
  );

  //console.log({ source, destination})
  const file = `${destination}/${source.name}.css`;
  await write(file, post.css);
};

export const js = async (source, destination, env) => {
  await esbuild.build({
    entryPoints: [[source.dir, source.base].join('/')],
    bundle: false,
    minify: env === 'development' ? false : true,
    sourcemap: env === 'development' ? true : false,
    target: ['chrome58', 'firefox57'],
    outfile: `${destination}/${source.name}.js`,
  });
  console.log(
    chalk.hex('#fec70b').bold(`esbuild ${`${destination}/${source.name}.js`}`)
  );
};

export const write = async (file, data) => {
  //console.log(`Writing ${file}`)
  return await outputFile(file, data);
};

export const process = async (path, env = 'production') => {
  const props = p.parse(path);
  const dest = props.dir.replace('src', 'dist');

  switch (props.ext) {
    case '.scss':
      if (props.name.at(0) === '_') {
        return; // ignore if partial
      }
      await css(props, dest, env);
      break;
    case '.tsx':
    case '.ts':
      await js(props, dest, env);
      break;
    case '.woff2':
    case '.ttf':
      await fonts(props, dest);
      await materialSymbolsFont(dest);
      break;
    default:
      //console.log(props.ext)
      break;
  }
};
