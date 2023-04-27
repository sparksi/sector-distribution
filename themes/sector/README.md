# Sector Base Theme

This is the Sector Distribution base theme, heavily influenced by the great [Radix theme](https://www.drupal.org/project/radix). It bundles [Tailwind](https://tailwindcss.com/), [esbuild](https://esbuild.github.io/), [BrowserSync](https://browsersync.io/) and [Google Material Symbols](https://fonts.google.com/icons).

## Requirements
1. pnpm - [read how to install here](https://pnpm.io/installation).
2. Drush - [read how to install here](https://www.drush.org/en/master/install/).
3. [Components module](https://www.drupal.org/project/components)

## Creating a subtheme
- Generate subtheme from the starter kit: `drush --include="profiles/contrib/sector/themes/sector" sector:create SUBTHEME NAME`
- Set as default theme: `drush en SUBTHEME_NAME -y; drush config-set system.theme default SUBTHEME_NAME -y`
- Install required modules: `cd /web/themes/custom/SUBTHEME_NAME; pnpm install`


### Development
- Watch `pnpm watch`

#### Use BrowserSync

- Update the `sector10.ddev.site` value in `package.json` with your local site url.
- Run `pnpm sync` (separately to your `watch` task).