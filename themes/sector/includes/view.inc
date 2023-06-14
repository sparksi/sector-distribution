<?php

/**
 * @file
 * Theme and preprocess functions for views.
 */
use Drupal\Core\Template\AttributeArray;

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

/**
 * Implements hook_preprocess_views_view_list().
 *
 * Attach libraries based on CSS class attached to view display.
 * Currently only supporting HTML List.
 */
function sector_preprocess_views_view_list(&$variables) {
  $css_classes = $variables['attributes']['class'] ?? [];
  $list_css_classes = $variables['list']['attributes']['class'] ?? [];
  $theme = \Drupal::config('system.theme')->get('default');

  if ($list_css_classes instanceof AttributeArray) {
    $css_classes = [...$css_classes, ...$list_css_classes->value()];
  }

  foreach ($css_classes as $class) {
    $variables['#attached']['library'][] = $theme . '/' . $class;
  }
}


/**
 * Implements hook_form_alter().
 */
function sector_form_views_exposed_form_alter(&$form, \Drupal\Core\Form\FormStateInterface $form_state, $form_id) {
  switch ($form_id) {
    case 'views_exposed_form':

      if ($form['#id'] === 'views-exposed-form-sector-search-sitewide-sector-page') {
        if (isset($form['query'])) {
          $form['#action'] = '/search';
          $attributes = $form['query']['#attributes'] ?? [];
          $form['query']['#attributes'] = [...$attributes, ...[
            'required' => 'required',
            'type' => 'search',
            'inputmode' => 'search',
            'autocomplete' => 'off',
            'autocapitalize' => 'off',
          ]];
        }
      }
      break;
  }
}
