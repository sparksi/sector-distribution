# Sector Radix Starter

Welcome.

- Who - [Sparks Interactive](http://sparksinteractive.co.nz/).
- What - Sector Radix Starter is a Drupal theme designed to work in tandem with the Sector install profile.
- Why - Sector Radix Starter provides base typography, helper classes, spacing and general styles for default components provided by Sector.
- How - You can use Sector Radix Starter as a base theme or by cloning and owning.

This README outlines:

- How to use Sector Radix Starter
- Sector Radix Starter frontend workflow
- CSS coding standards and frontend architecture

## How to use Sector Radix Starter

There are two ways to use Sector Radix Starter, as a base theme or by cloning and owning.

### Use Sector Radix Starter as a base theme

Create a subtheme the [Drupal way](https://www.drupal.org/node/225125) using Sector Radix Starter as your base theme.

### Use Sector Radix Starter by cloning and owning

**Note:** The Sector Radix Starter frontend workflow requires a _minimum_ Node.js version of 10 but version 12 is recommended.

Make a copy of the Sector Radix Starter theme

`cd {PROJECTNAME}/web/themes/$ mkdir custom`
`cd custom/`

Make a copy of the Sector Radix Starter theme

`{PROJECTNAME}/web/themes/custom/$ cp -R ../../profiles/contrib/sector-distribution/themes/sector_radix_starter {PROJECTTHEMENAME}`

**Within your _new_ `{PROJECTTHEMENAME}` theme...**

`yarn && yarn setup` will install all theme dependencies and execute a script which will rename these files:

* `{PROJECTTHEMENAME}.breakpoints.yml`
* `{PROJECTTHEMENAME}.info.yml`
* `{PROJECTTHEMENAME}.libraries.yml`
* `{PROJECTTHEMENAME}.theme`

It will also rename the theme preprocess hooks in `{PROJECTTHEMENAME}.theme` and `includes/*.inc`. e.g. `function {PROJECTTHEMENAME}_preprocess()` .

And rename references to sector\_radix_starter in `package.json`.

**❗️However you will still need to edit `{PROJECTTHEMENAME}.info.yml` and change the theme's `name` property.**

Optionally update your themes `screenshot.png`.

---
Now jump in the backend and activate your new subtheme via the path:

`/admin/appearance`

## Sector Radix Starter frontend workflow

This project uses a NodeJS LibSaSS compilation pipeline.

You can use Yarn to provide a completely localised project dependency environment.

### Installing the localised dependencies requires the following steps:

1. Install Node Version Manager (NVM) and Node
2. Install dependencies & Run the project

### 1. Install Node Version Manager (NVM)

We strongly recommend you use NVM, a tool to manage NodeJS versions: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm).
In the case where `node` is not installed at a server level, you will be required to use NVM.

It is a local tool that needs to be installed and configured on a "per user" basis.
This repository contains an `.nvmrc` that allows us to set the node version we expect you to use.

To install NVM, follow the instructions at [https://github.com/nvm-sh/nvm#installing-and-updating](https://github.com/nvm-sh/nvm#installing-and-updating).
When the install finishes it will tell you to log out and back in, but this is not required, just run `source ~/.profile` to refresh your path.

To download versions of NodeJS, run `nvm install x.x` or just `nvm install stable` which is the latest stable version.

Run `nvm install stable`

`nvm ls-remote` will give you a complete list of available versions.

You can check your current version of node with `node -v`, by default this will be the system version (if `node` is installed system-wide).

You can run `nvm use x.x` to use a specific version.
NVM will look for an `.nvmrc` file and use that if it can, so once you `cd` inside the project directory, you can just run `nvm use` to start using the right version as defined by this project.

Note that any NVM commands you run are session only.
When you log out, next time you come back the system version of NodeJS will be in use again.

Run `nvm alias default 13`

This is to save a default that will be used for all future bash sessions.

You can replace "13" with the "x.x" version you prefer if required.

### 2. Install dependencies & Run the project

Install Yarn

 `apt-get install yarn`

See more: [https://yarnpkg.com/en/docs/install](https://yarnpkg.com/en/docs/install)

Then `cd` inside the root of this theme directory.

Now you can run the 3 commands needed to compile and watch the files in the `./scss/` directory. The SCSS files will be compiled into a `./css/` directory.

`yarn install && yarn build`

The first command, `yarn install` will download and install all the modules listed in the `package.json` file into the `./node_modules/` directory.

The last command, `yarn build`, again executes a script defined in the `package.json`. This script runs a series of subtasks also defined in `package.json` that will build the CSS, Javascript and SVG's that the theme requires.

---

### Component-driven theming

Sector Radix Starter adheres to a component-driven approach to theming with the aim to load *only* the front-end assets that pertain to components used on a page. We achieve this by using [Drupal 8's library system](https://www.drupal.org/docs/8/theming/adding-stylesheets-css-and-javascript-js-to-a-drupal-8-theme) to control what *is* and what is *not* loaded on any given page.

Add your components' libraries to your [theme].libraries.yml file. You can choose to

a) load the library on every page by including it to the libraries attribute of [theme].info.yml or...

b) rely on Sector's class-sniffing preprocess functions to include your library *only* when the component exists on a page. This requires following a strict conventional approach for naming your libraries. For example, a library named 'example' will require the same custom CSS class to be applied to a block, view, field etc.

---

#### Useful NPM scripts

##### Utilities

* `postinstall` - runs after packages are installed. `yarn outdated` is executed, which checks your installed packages for updates.
* `yarn reinstall` - empties node_modules directory, cleans yarn cache and reinstalls packages
* `yarn clean` - empties dist directory

##### Javascript

* `yarn wp:build:dev` - listens on javascript files in and compiles + transpiles javascripts according to the configuration in `./webpack.config.js` with source maps,
* `yarn wp:build` - listens on javascript files in and compiles + transpiles javascripts according to the configuration in `./webpack.config.js` without source maps, compressed.

##### SASS

* `yarn scss:dev` - compiles SCSS with source maps in nested output style,
* `yarn scss:production` - compiles SCSS without source maps in compressed output style.

##### PostCSS
* `yarn pcss` - runs postcss in CSS files inside `./dist/`. Only files named `ie11.css` will be autoprefixed, and all files will be subject to [postcss-inline-svg](https://github.com/TrySound/postcss-inline-svg) processing.

##### Miscellaneous

* `yarn generate-icons` - will build a set of favicons / device icons based off the themes favicon.svg vector file. Configuration can be edited in `./.icons.js`.
* `yarn fonts` - will take any ttf fonts from `./src/fonts` and produce web-friendly woff, woff2 and eot files in `./dist/fonts`. Configuration can be edited in `./.fontmin.js`.
* `yarn svg` - runs svgo on all svgs

##### Watching & Building

* `yarn watch` - runs all scripts matching *:watch
* `yarn build` - completes two grouped tasks in parallel:
	* Task 1: compiles production-ready theme. Builds SCSS (if linting is successful), runs post-css (autoprefixer) and compiles javascript.
	* Task 2: generates favicons and fonts
* `prebuild` - will update the themes version of Bootstrap to the latest available version and also run linters on source javascript and css, aaccording to `./eslintrc.yml` and `./sass-lint.yml` respectively.
