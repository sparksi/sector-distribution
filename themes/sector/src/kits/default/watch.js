import p from 'node:path';
import chokidar from 'chokidar';
import { mkdir, rm } from 'node:fs';
import chalk from 'chalk';

import { process } from './build/develop.js';

const dir = 'src';

const watcher = chokidar.watch(dir, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true,
  interval: 100,
  usePolling: true,
});

console.log(chalk.hex('#fefefe').bold(`👀 Listening on ${dir}...`));

watcher.on('add', (path) => {
  process(path, 'development');
});
watcher.on('change', (path) => {
  process(path, 'development');
});
watcher.on('addDir', (path) => {
  const props = p.parse(path);
  const dest = props.dir.replace('src', 'dist');
  //mkdir(dest, { recursive: true }, () => true);
  console.log(`mkdir ${dest}`);
});
watcher.on('unlinkDir', (path) => {
  const props = p.parse(path);
  const dest = props.dir.replace('src', 'dist');
  //rm(dest, { recursive: true }, () => true)
  console.log(`rmdir ${dest}`);
});
