<?php

/**
 * @file
 * Theme and preprocess functions for entities controlled with DS.
 */

/**
 * Implements hook_preprocess_ds_entity_view().
 *
 * Attach libraries based on classes attached to the view mode.
 */
function sector_radix_starter_preprocess_ds_entity_view(&$variables) {
  $settings = $variables['content']['#settings'] ?? NULL;
  if ($settings && isset($settings['classes'])) {
    foreach ($settings['classes'] as $css_field) {
      _sector_radix_starter_attach_library_by_class($variables, $css_field);
    }
  }
}
