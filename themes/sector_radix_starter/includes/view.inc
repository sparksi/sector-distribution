<?php

/**
 * @file
 * Theme and preprocess functions for views.
 */

use Drupal\Core\Template\AttributeArray;

/**
 * Implements hook_preprocess_views_view().
 *
 * Attach libraries based on CSS class attached to view.
 */
function sector_radix_starter_preprocess_views_view(&$variables) {
  $variables['#attached']['library'][] = 'sector_radix_starter/view';
  $css_classes = $variables['attributes']['class'] ?? [];
  _sector_radix_starter_attach_library_by_class($variables, $css_classes);
}

/**
 * Implements hook_preprocess_views_view_list().
 *
 * Attach libraries based on CSS class attached to view display.
 * Currently only supporting HTML List.
 */
function sector_radix_starter_preprocess_views_view_list(&$variables) {
  $wrapper_css_classes = $variables['attributes']['class'] ?? [];
  $list_css_classes = $variables['list']['attributes']['class'] ?? [];
  _sector_radix_starter_attach_library_by_class($variables, $wrapper_css_classes);
  /* @var \Drupal\Core\Template\AttributeArray */
  if ($list_css_classes instanceof AttributeArray) {
    _sector_radix_starter_attach_library_by_class($variables, $list_css_classes->value());
  }
}
