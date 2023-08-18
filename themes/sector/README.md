# Sector Base Theme

This is the Sector Distribution base theme, heavily influenced by the great [Radix theme](https://www.drupal.org/project/radix). It bundles [Tailwind](https://tailwindcss.com/), [esbuild](https://esbuild.github.io/), [BrowserSync](https://browsersync.io/) and [Google Material Symbols](https://fonts.google.com/icons).

## Requirements
1. pnpm - [read how to install here](https://pnpm.io/installation).
2. Drush - [read how to install here](https://www.drush.org/en/master/install/).
3. [Single Directory Components](https://www.drupal.org/project/sdc)

## Creating a subtheme
- Generate subtheme from the starter kit (from inside `web`): `php core/scripts/drupal generate-theme --starterkit sector_starterkit SUBTHEME_NAME --path themes/custom`
- Set as default theme: `drush en SUBTHEME_NAME -y; drush config-set system.theme default SUBTHEME_NAME -y`
- Install required packages: `cd /web/themes/custom/SUBTHEME_NAME; pnpm install`
- Build: `pnpm build`

### Development
- `pnpm dev`

  * will run `watch` and `browsersync` in parallel

#### Use BrowserSync

- Update the `sector10.ddev.site` value in `package.json` with your local site url.

