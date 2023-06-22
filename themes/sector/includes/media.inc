<?php

/**
 * @file
 * Theme and preprocess functions for media.
 */

/**
 * Implements hook_preprocess_media().
 *
 * Attach libraries based on classes attached to the view mode.
 */
function sector_preprocess_media(&$variables) {
  $media = $variables['elements']['#media'];

  switch ($media->bundle()) {
    case 'image':
      $brightness = $media->get('field_brightness')->getValue();
      $variables['attributes']['class'][] = 'dark';

      if (isset($brightness[0])) {
        $variables['attributes']['class'][] = $brightness[0]['value'];
      }
      break;
  }
}
