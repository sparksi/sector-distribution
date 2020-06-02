<?php

/**
 * @file
 * Theme and preprocess functions for fields.
 */

/**
 * Implements hook_preprocess_field().
 *
 * Bootstrap and Display Suite (DS) don't play together, so the display suite
 * settings are being lost since bootstrap overrides field.html.twig.
 * Unfortunately this means we lost our colons on default fields. So we are
 * going to override the template for field.html.twig and provide the ds
 * settings in the variables.
 */
function sector_radix_starter_preprocess_field(&$variables) {
  $element = $variables['element'];
  $variables['field_name'] = $element['#field_name'];
  // Display Suite field classes (when using expert field template).
  if (isset($variables['ds-config']['settings'])) {
    $variables['settings'] = $variables['ds-config']['settings'];
    // Label class, field class, field item class, outer wrapper class.
    $keys = ['lbw-cl', 'fis-cl', 'fi-cl', 'ow-cl'];
    // Explode the classes, loop over each and attach library if it exists.
    foreach ($keys as $key) {
      if (isset($variables['settings'][$key])) {
        foreach (explode(' ', $variables['settings'][$key]) as $library) {
          if ($library) {
            $variables['#attached']['library'][] = 'sector_radix_starter/' . $library;
          }
        }
      }
    }
  }
  $css_classes = [];
  // Display Suite field classes (when using default/minimal field template).
  $classes = $variables['attributes']['class'] ?? [];
  foreach ($classes as $group) {
    $css_classes = array_merge($css_classes, explode(' ', $group));
  }
  _sector_radix_starter_attach_library_by_class($variables, $css_classes);
  // Add hide class to empty body field.
  switch ($variables['field_name']) {
    case "body":
      $body = ($variables['items'][0]['content']['#text']) ?? null;
      if (empty($body)) {
        $variables['attributes']['class'][] = 'hide';
      }
      break;
  }
}
