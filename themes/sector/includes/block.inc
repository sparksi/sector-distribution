<?php

/**
 * @file
 * Theme and preprocess functions for block.
 */

use Drupal\Core\Render\Element;

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function sector_theme_suggestions_block_alter(array &$suggestions, array $variables) {
  // Check for BlockContent.
  $allow = ['block_content', 'fieldblock'];

  if(!in_array($variables['elements']['#configuration']['provider'], $allow)) {
    return;
  }

  if (!empty($variables['elements']['content']['#block_content'])) {
    // Get the block bundle.
    $block_content = $variables['elements']['content']['#block_content'];
    $bundle = $block_content->bundle();

    // Add to theme suggestions.
    $suggestions[] = 'block__block_content__' . $bundle;
    return;
  }

  if (!empty($variables['elements']['content']['field'])) {
    $suggestions[] = 'block__fieldblock__' . $variables['elements']['content']['field']['#field_name'];
    return;
  }

}

/**
 * Implements hook_preprocess_block().
 */
function sector_preprocess_block(&$variables) {


  // Add id to template.
  if (isset($variables['elements']['#id'])) {
    $variables['id'] = str_replace('_', '-', $variables['elements']['#id']);
  }

  // Check for BlockContent.
  if ($variables['elements']['#configuration']['provider'] != 'block_content' || empty($variables['elements']['content']['#block_content'])) {
    return;
  }

  // Get the block bundle.
  $block_content = $variables['elements']['content']['#block_content'];

  // Add bundle to template.
  $variables['bundle'] = $block_content->bundle();

  // Add custom attribute class for block.
  if ($variables['elements']['#base_plugin_id'] == 'block_content') {
    $blockType = strtr($variables['bundle'], '_', '-');
    $variables['attributes']['class'][] = 'block--type-' . $blockType;
  }

  $theme = \Drupal::config('system.theme')->get('default');
  $classes = $variables['attributes']['class'] ?? [];

  foreach ($classes as $class) {
    $variables['#attached']['library'][] = $theme . '/' . $class;
  }
}

/**
 * Implements template_preprocess_block_content().
 */
function sector_preprocess_block_content(&$variables) {
  // Helpful $content variable for templates.
  $variables += ['content' => []];
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}

function sector_preprocess_block__system_messages_block(&$variables) {
  $variables['content']['#include_fallback'] = FALSE;
}