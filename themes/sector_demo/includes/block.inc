<?php

/**
 * @file
 * Theme and preprocess functions for blocks.
 */

function sector_demo_preprocess_block(&$variables) {
  $bid = $variables['base_plugin_id'];
  $css_classes = [];
  $classes = $variables['attributes']['class'] ?? [];
  foreach ($classes as $group) {
    $css_classes = array_merge($css_classes, explode(' ', $group));
  }

  // Attach library that matches block css class.
  foreach ($css_classes as $css_class) {
    $variables['#attached']['library'][] = 'sector_demo/' . $css_class;
  }
}