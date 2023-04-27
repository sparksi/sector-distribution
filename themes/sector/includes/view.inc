<?php

/**
 * @file
 * Theme and preprocess functions for views.
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function sector_theme_suggestions_views_view_alter(array &$suggestions, array $variables) {
  // Add a suggestion based on the view name and the current display.
  $view = $variables['view'];
  $name = $view->id();
  $display = $view->current_display;
  $suggestions[] = 'views_view__' . $name;
  $suggestions[] = 'views_view__' . $name . '__' . $display;

  $theme = \Drupal::config('system.theme')->get('default');
  $classes = $variables['attributes']['class'] ?? [];
  
  foreach ($classes as $class) {
    $variables['#attached']['library'][] = $theme . '/' . $class;
  }

  $variables['#attached']['library'][] = $theme . '/' . $name;
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function sector_theme_suggestions_views_view_unformatted_alter(array &$suggestions, array $variables) {
  // Add a suggestion based on the view name and the current display.
  $view = $variables['view'];
  $name = $view->id();
  $display = $view->current_display;
  $suggestions[] = 'views_view_unformatted__' . $name . '__' . $display;
}
