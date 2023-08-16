<?php

/**
 * @file
 * Theme and preprocess functions for blocks.
 */

function sector_demo_preprocess_region(&$variables) {
  $variables['#attached']['library'][] = 'sector_demo/' . $variables['region'];
}