<?php

/**
 * @file
 * Theme and preprocess functions for taxonomy and vocabularies.
 */

/**
 * Implements hook_theme_suggestions_taxonomy_term_alter().
 */
function sector_theme_suggestions_taxonomy_term_alter(array &$suggestions, array $variables) {
  /** @var \Drupal\taxonomy\TermInterface $term */
  $term = $variables['elements']['#taxonomy_term'];
  $sanitized_view_mode = strtr($variables['elements']['#view_mode'], '.', '_');
  // Add view mode theme suggestions.
  $suggestions[] = 'taxonomy_term__' . $sanitized_view_mode;
  $suggestions[] = 'taxonomy_term__' . $term->bundle() . '__' . $sanitized_view_mode;
  $suggestions[] = 'taxonomy_term__' . $term->id() . '__' . $sanitized_view_mode;

  $theme = \Drupal::config('system.theme')->get('default');
  $variables['#attached']['library'][] = $theme . '/' . $term->bundle();
}
