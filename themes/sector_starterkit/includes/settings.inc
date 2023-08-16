<?php

/**
 * @file
 * Adjust the theme settings form to add local tweaks and options.
 *
 * https://www.drupal.org/node/177868
 *
 * /admin/appearance/settings/sector_starterkit
 *
 * This mimics what Bootstrap does in its own form_alter.
 * Beware, removing Bootstrap may break assumptions about the theme form made here.
 *
 * Creates the SVG logo source textfield so Designers can use it in their twig
 * templates.
 *
 * Implements hook_form_alter().
 */
function sector_starterkit_form_system_theme_settings_alter(&$form, &$form_state) {
    // Vertical tab.
    $form['sector_starterkit'] = array(
      '#type' => 'vertical_tabs',
      '#prefix' => '<h2><small>Sector settings</small></h2>',
      '#weight' => -20,
    );
    // Component.
    $form['customizations'] = array(
      '#type' => 'details',
      '#title' => t('Primary Brand'),
      '#group' => 'sector_starterkit',
    );

    // Textarea for user to enter the svg_logo_source.
    $form['customizations']['brand'] = array(
      '#type'     => 'entity_autocomplete',
      '#title'    => t('Choose from your Sector Brand entities'),
      '#description'    => t('We\'ll use this brand to generate the icon set'),
      '#target_type' => 'block_content',
      '#selection_settings' => ['target_bundles' => ['sector_brand']],
      '#tags' => false,
      '#size' => 30,
      '#maxlength' => 1024,
      '#default_value' => theme_get_setting('brand') ? \Drupal\block_content\Entity\BlockContent::load(theme_get_setting('brand')) : null,
    );


    $form['manifest'] = array(
        '#type' => 'details',
        '#title' => t('Manifest'),
        '#group' => 'sector_starterkit',
    );
  }