const replaceInFiles = require('replace-in-files');
const mv = require('mv');

const themeName = __dirname.split('/').pop();

const options = {
  files: [
    'sector_starter.breakpoints.yml',
    'sector_starter.info.yml',
    'sector_starter.libraries.yml',
    'sector_starter.theme',
    'package.json',
    'js/src/global.behaviors.js',
    'config/install/sector_starter.settings.yml'
  ],
  from: /sector_starter/g,  // string or regex
  to: `${themeName}`,
  optionsForFiles: { // default
    "ignore": [
      "**/node_modules/**"
    ]
  },
  saveOldFile: false, // default
  encoding: 'utf8',  // default
  onlyFindPathsWithoutReplace: false, // default
  returnPaths: true, // default
  returnCountOfMatchesByPaths: true // default
};

async function main() {
  try {
    const {
      changedFiles,
      countOfMatchesByPaths,
      replaceInFilesOptions
    } = await replaceInFiles(options);
    console.log('Modified files:', changedFiles);
    console.log('Count of matches by paths:', countOfMatchesByPaths);
    console.log('was called with:', replaceInFilesOptions);

    options.files.forEach((file) => {
      const newFileName = file.replace('sector_starter', themeName);
      mv(file, newFileName, (err) => {
        console.log(`Renamed: ${file} ➡️  ${newFileName}`);
      });
    });

  }
  catch (error) {
    console.log('Error occurred:', error);
  }
}

main();
