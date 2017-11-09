/**
 * @file Gulpfile that contains tasks for compiling the theme.
 */

/* Delcare a basePaths and paths object.
 * This enables us to group and use paths as variables.
 */

const basePaths = {
  src: 'build/',
  dest: 'html/assets/',
};
const paths = {
  images: {
    dest: './images/'
  },
  sprite: {
    src: `${basePaths.src}sprite/*`,
    svg: '../../images/sprite.svg',
    css: '../../scss/generic/_sprite.scss'
  },
  templates: {
    src: `${basePaths.src}tpl/`
  }
};

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const globbing = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gulpif = require('gulp-if');
const vfs = require('vinyl-fs');
const rename = require("gulp-rename");
const babel = require('gulp-babel');
const header = require('gulp-header');

/* Declared in a $ object to group SVG related var */
let $ = {
  gutil: require('gulp-util'),
  svgSprite: require('gulp-svg-sprite'),
  svg2png: require('gulp-svg2png'),
  size: require('gulp-size'),
};

/**
 * Automated SVG'S with png fallback. Reproduced with permission from Mike Street.
 * https://www.liquidlight.co.uk/blog/article/creating-svg-sprites-using-gulp-and-sass/
 */

/* Pretty colours for the output */
let changeEvent = (evt) => {
  $.gutil.log('File', $.gutil.colors.cyan(evt.path.replace(new RegExp(`/.*(?=/${basePaths.src})/`), '')), 'was', $.gutil.colors.magenta(evt.type));
};


/**
 * Default SASS settings.
 */
let sassConfig = {
  // outputStyle: nested, compact, expanded, compressed.
  outputStyle: 'expanded',
  // includePaths: array of directories from which to load 3rd party @imports.
  includePaths: [
    './bower_components/breakpoint-sass/stylesheets',
    './bower_components/susy/sass',
    './bower_components/compass-mixins/lib'
  ]
};


/**
 * Default flags for gulp-if.
 */
var flags = {
  sourceMaps: true
};



/**
 * Gulp svgSprite task.
 *
 */
gulp.task('svgSprite', () => {
  return gulp.src(paths.sprite.src)
    .pipe($.svgSprite({
      shape: {
        spacing: {
          padding: 5
        }
      },
      mode: {
        css: {
          dest: "./",
          layout: "diagonal",
          sprite: paths.sprite.svg,
          bust: false,
          render: {
            scss: {
              dest: "../../scss/generic/_sprite.scss",
              template: "build/tpl/sprite-template.scss"
            }
          }
        }
      },
      variables: {
        mapname: "icons"
      }
    }))
    .pipe(gulp.dest(basePaths.dest));
});

/**
 * Gulp pngSprite task.
 *
 */
gulp.task('pngSprite', ['svgSprite'], () => {
  return gulp.src(basePaths.dest + paths.sprite.svg)
    .pipe($.svg2png())
    .pipe($.size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.images.dest));
});

/**
 * Gulp sprite task.
 *
 */
gulp.task('sprite', ['pngSprite']);


/**
 * Gulp copySpriteMixins task.
 *
 * In order to use our generated sprite, we require the sprite() mixin (and it's various mixin dependencies) 
 * available to call in our theme, so we copy it over to scss/generic and rename the file to something less 
 * generic than just _mixins.scss
 */
gulp.task('copySpriteMixins', () => {
  console.log('Copying build/sass/_mixins.scss to scss/generic/sprite-mixins.scss ...');
  return gulp
    .src('./build/sass/_mixins.scss')
    .pipe(rename("_sprite-mixins.scss"))
    .pipe(gulp.dest('./scss/generic'));
});

/**
 * Gulp compile function.
 *
 * Runs ./scss through a Gulp pipeline and writes the output to ./css.
 */
function compilePipeline(sassConfig, flags) {
  gulp.src('./scss/*.scss')
    // Initialize the source maps.
    .pipe(gulpif(flags.sourceMaps, sourcemaps.init()))
    // Enable globbing and configure it to look for SCSS files.
    .pipe(globbing())
    // Compile the SASS
    .pipe(sass(sassConfig).on('error', sass.logError))
    // Run autoprefixer with the default settings.
    .pipe(autoprefixer())
    // Write sourcemaps into the CSS file.
    .pipe(gulpif(flags.sourceMaps, sourcemaps.write()))
    // Send output through vinyl-fs to play nice with ownership.
    .pipe(vfs.dest('./css'));
}

/**
 * Gulp SASS task.
 *
 * Calls compilePipeline() with the default settings.
 */
gulp.task('sass', () => {
  compilePipeline(sassConfig, flags);
});

/**
 * Gulp production task.
 *
 * Calls compilePipeline() with settings and flags optimised for production.
 *
 * Run this task prior to your project going 'LIVE'. Removing source maps
 * alone reduces the size of your CSS by 60-80%.
 */
gulp.task('production', ['babel'], () => {
  sassConfig.outputStyle = 'compressed';
  flags.sourceMaps = false;
  compilePipeline(sassConfig, flags);
});

/**
 * Gulp watch task.
 *
 * Watches the ./scss directory for changes and runs the 'sass' task if any
 * are detected. Changes are logged to the console with a relative path.
 */
gulp.task('watch', () => {
  gulp.watch('./scss/**/*.{scss,sass}', ['sass']).on('change', (event) => {
    const path = event.path.replace(process.cwd(), '..');
    console.log(`File ${path} was ${event.type}, recompiling...`);
  });
  // Watch when new SVG's are added or modified
  gulp.watch(paths.sprite.src, ['sprite']).on('change', (evt) => {
    changeEvent(evt);
  });
});


/**
 * Gulp babel task.
 *
 * Transpiles files in ./js/src directory from ES6 to browser compatible 
 * javascript (ES5) and outputs it in ./js directory
 */
gulp.task('babel', () => {
  return gulp.src('./js/src/*.js')
    .pipe(header(`/*
 * == SECTOR == 
 * This is a transpiled file, please make changes to src/filename.js
 * and transpile with \`yarn run gulp run babel\`
 */\n\n\n`))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./js'))
});



/**
 * Gulp default task.
 *
 * Runs 'copySpriteMixins', 'sass', 'sprite' and then 'watch' to compile and continue watching for changes.
 */
gulp.task('default', ['copySpriteMixins', 'sass', 'babel', 'sprite', 'watch']);
