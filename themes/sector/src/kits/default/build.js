import { glob } from 'glob'
import { process } from './build/develop.js'
import chalk from 'chalk'

(async () => {
  const files = await glob('src/**');
  files.map(async path => await process(path))
    //files.forEach(async path => await(process(path)))
  //console.log(chalk.hex('#46ee57').bold(`🎉 Done`))
})();


