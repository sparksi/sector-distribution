<?php

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function sector_theme_suggestions_layout_alter(array &$suggestions, array $variables) {
  if (isset($variables['content']['#entity'])) {
    $entity = $variables['content']['#entity'];
    $suggestions[] = 'layout__' . $entity->getEntityType()->id();
    $suggestions[] = 'layout__' . $entity->getEntityType()->id() . '__' . $entity->bundle();
  }
}
