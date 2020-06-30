<?php

/**
 * @file
 * Theme and preprocess functions for media.
 */

/**
 * Implements hook_preprocess_HOOK().
 *
 * Add an authenticated check to the template.
 */
function sector_radix_starter_preprocess_media_embed_error(&$variables) {
  $user = \Drupal::currentUser();
  $variables['authenticatedUser'] = $user->isAuthenticated();
}