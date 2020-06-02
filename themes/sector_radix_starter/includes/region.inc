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
function sector_radix_starter_preprocess_region(&$variables) {
  $variables['#attached']['library'][] = 'sector_radix_starter/region--' . $variables['region'];
}
