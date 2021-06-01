const replace = require('replace-in-file');
const mv = require('mv');

const themeName = __dirname.split('/').pop();

console.log(`New theme name: ${themeName}`);

const options = {
  allowEmptyPaths: true,
  files: [
    'sector_radix_starter.breakpoints.yml',
    'sector_radix_starter.info.yml',
    'sector_radix_starter.libraries.yml',
    'sector_radix_starter.theme',
    'package.json',
    'config/install/sector_radix_starter.settings.yml',
    'includes/*.inc',
    'composer.json',
    'config/**/*.yml',
    'src/components/node/node.twig',
    'templates/content/node.html.twig'
  ],
  from: /sector_radix_starter/g,
  to: themeName,
  countMatches: true,
  ignore: [
    './node_modules'
  ]
};

replace(options)
  .then(results => {
    //console.log('Replacement results:', results);

    Promise.all(results.map(({ file: fileName }) => new Promise((resolve, reject) => {
      const newFileName = fileName.replace('sector_radix_starter', themeName);
      mv(fileName, newFileName, (err) => {
        if(err)reject(err);
        resolve(`Renamed: ${fileName} ➡️ ${newFileName}`);
      });

    }))).then(result => {
      console.log(`Renamed ${result.length} files`);
    });

  })
  .catch(error => {
    console.error('Error occurred:', error);
  });