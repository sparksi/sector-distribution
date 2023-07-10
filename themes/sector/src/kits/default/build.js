import { glob } from 'glob';
import { process } from './build/develop.js';
import chalk from 'chalk';
import { Worker, workerData } from 'node:worker_threads'


(async () => {
  const files = await glob('src/**');
  const components = await glob('components/**');

  Promise.allSettled(([
    components.map(async (path) => await process(path)),
    files.map(async (path) => await process(path)),
    new Promise(async (resolve, reject) => {
      const worker = new Worker('./.fonts.js', {
        workerData: 'src/fonts/*.{woff2,ttf}',
      });
      worker.on('message', resolve);
      worker.on('error', (e) => reject(e));
    })
  ])).then(done => {
    console.log(done.map((task, i) => `Task ${i+1} was ${task.status}`))
    console.log(chalk.hex('#46ee57').bold(`🎉 Done`))
  });

})();