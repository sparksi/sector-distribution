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
function sector_preprocess_ds_entity_view(&$variables) {
  $settings = $variables['content']['#settings'] ?? NULL;
  $view_mode = $variables['content']['#view_mode'] ?? NULL;
  $theme = \Drupal::config('system.theme')->get('default');

  if ($settings && isset($settings['classes'])) {
    foreach ($settings['classes'] as $css_field) {
      $variables['#attached']['library'][] = $theme . '/' . $css_field;
    }
  }

  if($settings && isset($settings['attributes'])) {
    $attributes = array_filter(explode(',', $settings['attributes']), function($k) {
      return $k !== "";
    });
    if(count($attributes) > 0){
      foreach($attributes as $attribute) {
        $parts = explode('|', $attribute);
        if($parts[1]){
          $variables['#attached']['library'][] = $theme . '/' . $parts[1];
        }
      }
    }
  }
}


  