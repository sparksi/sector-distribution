# Sector Starter

Welcome.

- Who - [Sparks Interactive](http://sparksinteractive.co.nz/).
- What - Sector Starter is a Drupal theme designed to work in tandem with the Sector install profile.
- Why - Sector Starter provides base typography, helper classes, spacing and general styles for default components provided by Sector.
- How - You can use Sector Starter as a base theme or by cloning and owning.

This README outlines:

- How to use Sector Starter
- Sector Starter frontend workflow
- CSS coding standards and frontend architecture

## How to use Sector Starter

There are two ways to use Sector Starter, as a base theme or by cloning and owning.

### Use Sector Starter as a base theme.

Create a subtheme the [Drupal way](https://www.drupal.org/node/225125) using Sector Starter as your base theme.

### Use Sector Starter by cloning and owning

Make a copy of the Sector Starter theme

`/web/themes/custom/$ cp -R sector_starter {PROJECTTHEMENAME}`

**Within your _new_ `{PROJECTTHEMENAME}` theme...**

**Rename the .yml files in the root of your theme eg: sector_starter.info.yml becomes:**

`/{PROJECTTHEMENAME}/{PROJECTTHEMENAME}.info.yml`

**Search and replace 'sector_starter' and 'Sector starter' with your theme name within your new theme**

Note: The package.json file also inludes a repository url which should be updated.

Optionally update your themes screenshot.png

Now jump in the backend and activate your new subtheme via the path:

`/admin/appearance`

Your new theme may be loading the Bootstrap CDN by default. Make sure you turn this setting off (As your theme is already loading Bootstrap via SASS). Turn the CDN setting off via the 'Bootstrap Settings/advanced tab' on this page:

`/admin/appearance/settings/{PROJECTTHEMENAME}`

## Sector Starter frontend workflow

If you want to modify SCSS/CSS/SVG sprites etc you'll need to install localised dependencies.

This project uses a NodeJS LibSaSS compilation pipeline.

This project uses NPM or Yarn and Bower to provide a completely localised project dependency environment.

### Installing the localised dependencies requires the following steps:

1. Install Node Version Manager (NVM) and Node
2. Install dependencies & Run the project

### 1. Install Node Version Manager (NVM)

We strongly recommend you use NVM, a tool to manage NodeJS versions: https://github.com/creationix/nvm.
In the case where `node` is not installed at a server level, you will be required to use NVM.

It is a local tool that needs to be installed and configured on a "per user" basis.
This repository contains an `.nvmrc` that allows us to set the node version we expect you to use.

To install NVM, run `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash`.
When the install finishes it will tell you to log out and back in, but this is not required, just run `source ~/.profile` to refresh your path.

To download versions of NodeJS, run `nvm install x.x` or just `nvm install 6` which is the latest version as of writing this.

Run `nvm install 6`

`nvm ls-remote` will give you a complete list of available versions.

You can check your current version of node with `node -v`, by default this will be the system version (if `node` is installed system-wide).

You can run `nvm use x.x` to use a specific version.
NVM will look for an `.nvmrc` file and use that if it can, so once you `cd` inside the project directory, you can just run `nvm use` to start using the right version as defined by this project.

Note that any NVM commands you run are session only.
When you log out, next time you come back the system version of NodeJS will be in use again.

Run `nvm alias default 6`

This is to save a default that will be used for all future bash sessions.

You can replace "6" with the "x.x" version you prefer if required.

### 2. Install dependencies & Run the project

Install Yarn (Optional)

 `apt-get install yarn`

Then `cd` inside the root of this theme directory.

Now you can run the 3 commands needed to compile and watch the files in the `./scss/` directory as well as watch for new SVG's in the `/build/sprite/` directory. The SCSS files will be compiled into a `./css/` directory. SVG's will be compiled to the `/images/` directory. Read more about svg here: https://www.liquidlight.co.uk/blog/article/creating-svg-sprites-using-gulp-and-sass/

`npm install && npm run bower install && npm run gulp` (**see note about `bower` below**)

or if using yarn

`yarn install && npm run bower install && yarn run gulp`

The first command, `npm install` or `yarn install` will download and install all the modules listed in the `package.json` file into the `./node_modules/` directory.

The second command, `npm run bower install`, executes a script defined in the `package.json` file. This simple script definition looks for the relative copy of the `bower` module, which is a front-end package manager and will install our front-end tools, such as Susy, into a `./bower_components/` directory.

**NOTE:** If `bower` does not install its packages, just run this instead: `./node_modules/bower/bin/bower install`. *This is because of an issue with the old version of NodeJS and NPM that come from the Ubuntu repositories.*

The last command, `npm run gulp` or `yarn run gulp`, again executes a script defined in the `package.json`. This script runs Gulp, which simply executes the default commands found in the `gulpfile.js` file. The commands we have defined as default are `sass` (compiles) and `watch` (watches).

#### Known error during default Gulp task:

`Error: EPERM: operation not permitted, chmod  '…/sector_starter/scss/generic/_sprite-mixins.scss'`

During the Gulp task Gulp is trying to run chmod over scss/generic/_sprite-mixins.scss

Because the _sprite-mixins.scss file is not owned by your user Gulp is not able to perform the chmod.

Related issue: https://github.com/gulpjs/gulp/issues/1012

In order to allow Gulp to perform the chmod run `sudo chown -R <your-user-name> scss/generic/_sprite-mixins.scss` at the root of the theme.

Rerun the `npm run gulp` or `yarn run gulp` command and the error should be resolved.

#### Working with Sass and Gulp

To watch for changes to SASS and new SVG's run the following command
inside the root of this theme directory.

`npm run gulp`

or with yarn

`yarn run gulp` (One off production command complies sprites and compiles and lints SCSS, JS)

`yarn run gulp watch` (Watches Sprites, SCSS and JS and lints SCSS and JS)

`yarn run gulp dev` (+ Source mapping)

## CSS Coding Standards and Frontend Architecture
This theme includes Bootstrap so we already have a frontend architecture framework out of the box. The aim of this theme is to use Bootstrap frontend architecture as a baseline framework whilst embracing the consensus of the Drupal community for all new development of frontend related components.

#### Drupal 8 Consensus

To minimise friction when contributing to CSS, the front-end developers of the Drupal community have reached consensus about their coding standards for:

- CSS formatting guidelines. https://www.drupal.org/node/1887862
- CSS architecture. https://www.drupal.org/docs/develop/standards/css/css-architecture-for-drupal-8
- CSS file organisation. https://www.drupal.org/docs/develop/standards/css/css-file-organisation-for-drupal-8

This theme aspires to follow these standards however there are exceptions:

- Bootstrap does not follow these coding standards. These standards apply only to new code authored (above and beyond these vendor products).
- CSS formatting 'Blank lines' is not adhered to. We use blank lines between SCSS declarations to makes the code more readable. (https://www.drupal.org/node/1887862/#blank-lines).

#### File organisation

Within the /sass folder we have 5 sub folders.

- /base /component /layout based on the file organisation outlined by the [consensus](https://www.drupal.org/node/1887922)
- /generic for global variables/mixins and webfonts
- /vendor for third party scss eg: Bootstrap.

Any code added to a partial should ideally always include a selector prefixed by the name of the partial.

eg: Within the _slat partial all selectors will start with 'slat' like slat--large, slat__title etc.

#### Bootstrap customisation

We want to be able to select which aspects of Bootstrap we require.

#### Working with CSS/JS in Sector Starter and Sector.

Frontend coders have there own personalised approaches for authoring html/css/js. Sector Starter is not designed to restrict coding freedom however it does provide an extensive toolbox:

- [Bootstrap](http://getbootstrap.com/). But be aware Sector Starter does not load all of Bootstrap’s SCSS/JS components by default. See `/scss/vendor/bootstrap/bootstrap-custom.scss` for a full list of included SCSS partials and sector_starter.info for a full list of included javascript.
- Custom helper classes hand crafted for Sector Starter `/scss/generic/_helpers`
- Custom layout classes hand crafted for Sector Starter `/scss/component/_responsive-layout.scss`
- Custom ‘slat’ classes hand crafted for Sector Starter `/scss/component/_slat.scss`

Sector displays are built using Display Suite. Use Sector Starter classes as much as possible to build layouts then extend if required.

*SCSS/CSS*

We load Bootstrap Sass via Bower in order to be able to select which partials of Bootstrap we want use. See `/scss/vendor/bootstrap/bootstrap-custom.scss` to select the components you wish to use.

*Javascript*

The same applies to Bootstrap Javascript

See `/sector_starter.libraries.yml` to add which components you need.