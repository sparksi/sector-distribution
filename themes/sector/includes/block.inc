<?php
use Drupal\block\Entity\Block;
use Drupal\Core\Template\Attribute;
use Drupal\Core\Render\Element;
/**
 * @file
 * Theme and preprocess functions for block.
 */


/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function sector_theme_suggestions_block_alter(array &$suggestions, array $variables) {
  // Check for BlockContent.
  $allow = ['block_content', 'fieldblock', 'system'];


  if(!in_array($variables['elements']['#configuration']['provider'], $allow)) {
    return;
  }

  if($variables['elements']['#configuration']['provider'] === 'system') {
    $block = Block::load($variables['elements']['#id']);
    $region = $block->getRegion();
    $suggestions[] = 'block__' . $variables['elements']['#id'] . '__' . $region;
    $suggestions[] = 'block__' . $variables['elements']['#configuration']['id'] . '__' . $region;
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

  if($variables['elements']['#configuration']['provider'] === 'menu_block') {
    if (!isset($variables['elements']['content']['#items'])) {
      $variables['content'] = [];
      $variables['label'] = [];
      return;
    }
    $variables['#cache']['max-age'] = 0;
  }

  // Check for BlockContent.
  if ($variables['elements']['#configuration']['provider'] != 'block_content' || empty($variables['elements']['content']['#block_content'])) {
    return;
  }

  // Add blockgroup inner div attribute set
  if($variables['elements']['#configuration']['provider'] === 'blockgroup') {
    $variables['blockgroup_content_attributes'] = new Attribute();
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