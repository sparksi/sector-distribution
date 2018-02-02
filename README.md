# Sector - a Distribution for Drupal 8

[Sector](https://www.sector.org.nz/) is a Drupal 8 distribution (or install profile) built and maintained by [Sparks Interactive](https://www.sparksinteractive.co.nz).

## Try Sector

We highly recommend you install and maintain Sector with composer.

### Create a New Project with Sector

When creating a new project with Sector, you can use our [composer project template](https://github.com/sparksi/sector-project).

    composer create-project sparksinteractive/sector-project {project-name}

In addition to setting up Drupal with [drupal-scaffold](https://github.com/drupal-composer/drupal-scaffold), it will also fetch development tools like [Drush](https://github.com/drush-ops/drush) and [Drupal Console](https://github.com/hechoendrupal/drupal-console).

### Add Sector to an Existing Project

You cannot add an install profile after you have installed Drupal, but if you have an existing composer project with no canonical database then you can add Sector directly:

    composer require sparksinteractive/sector-distribution

### Without Composer

If you don't want to use Composer, you can install Sector the traditional way by downloading a tarball from our [drupal.org](https://www.drupal.org/project/sector) project page.

For further information follow the [install instructions](https://www.drupal.org/docs/8/install).

## Getting Started

Read the guides on Sector's dedicated website: https://www.sector.org.nz/getting-started.

## Features and Functionality

Read about all the features on Sector's dedicated website: https://www.sector.org.nz/features-and-functionality.

## Documentation

Further documentation is coming soon on Sector's dedicated website: https://www.sector.org.nz/documentation.

## Sector Ecosystem

Sector Distribution aims to be lean and only includes core features that we feel are either very useful or indispensable on every kind of site. Therefore, additional functionality that we consider optional will be placed on [drupal.org](https://www.drupal.org) as a standalone module that can be included on any project.

### Sector Events

This module provides event management capability to Sector. You can download it from the module's [project page](https://www.drupal.org/project/sector_events) or include it with composer in your project directly:

    composer require drupal/sector_events

## Updating Sector and Drupal

Sector will be updated when you run `composer update`, but you can specifically update Sector and all its dependencies with `composer update sparksinteractive/sector-distribution`.

Sector does not require a specific minor version of Drupal 8 core, as we work to maintain and test Sector to be compatible with the latest releases of core.
You can check our [drupal.org](https://www.drupal.org/project/sector) project page for the latest tested version of core.

If you need to lock Drupal 8 core to a specific version you can do so for a specific project by running `composer require drupal/core:{version}`.

## Server Requirements

Sector has the same [system requirements](https://www.drupal.org/docs/8/system-requirements) as Drupal 8, but in addition requires PHP 7.1.

You must also install [Git](https://git-scm.com/) and [Composer](https://getcomposer.org/).

## Need Help or Found a Bug?

If you have any queries or issues about how to use Sector, then open an issue here or on our [drupal.org project page](https://www.drupal.org/project/sector).
