<?php

/**
 * @file
 * Theme and preprocess functions for blocks.
 */

/**
 * Implements hook_preprocess_block().
 *
 * Attach libraries based on classes.
 */
function sector_radix_starter_preprocess_block(&$variables) {
  $bid = $variables['base_plugin_id'];
  $css_classes = [];
  $classes = $variables['attributes']['class'] ?? [];
  foreach ($classes as $group) {
    $css_classes = array_merge($css_classes, explode(' ', $group));
  }
  // Attach particular libraries for the primary nav.
  if (in_array("navigation--primary", $css_classes)) {
    $variables['html_id'] = 'navigation';
  }
  $variables['#attached']['library'][] = 'sector_radix_starter/block-title';
  $variables['#attached']['library'][] = 'sector_radix_starter/' . $bid;
  // Attach library that matches block css class.
  foreach ($css_classes as $css_class) {
    $variables['#attached']['library'][] = 'sector_radix_starter/' . $css_class;
  }
  // Attach library that matches block ID.
  $variables['#attached']['library'][] = 'sector_radix_starter/' . $variables['elements']['#id'];
  // Attach the SVG logo.
  $variables['svg_logo_source'] = theme_get_setting('svg_logo_source');

  if(isset($variables['bundle'])) {
    $variables['#attached']['library'][] = 'sector_radix_starter/' . $variables['bundle'];
    $variables['attributes']['class'][] = $variables['bundle'];
  }
}
