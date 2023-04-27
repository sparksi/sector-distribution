<?php

/**
 * @file
 * Theme and preprocess functions for regions.
 */

/**
 * Implements hook_preprocess_region().
 *
 * Attach CSS class based on region.
 */
function sector_custom_preprocess_region(&$variables) {
  $theme = \Drupal::config('system.theme')->get('default');
  $variables['#attached']['library'][] = $theme . '/' . $variables['region'];
}
