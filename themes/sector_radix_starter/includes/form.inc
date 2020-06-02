<?php

/**
 * @file
 * Theme and preprocess functions for forms.
 */

/**
 * Implements hook_form_alter().
 */
function sector_radix_starter_form_alter(&$form, &$form_state, $form_id) {
  switch ($form_id) {
    case 'views_exposed_form':
      if ($form['#id'] === 'views-exposed-form-sector-sitewide-search-page-1') {
        if (isset($form['query'])) {
          $form['query']['#attributes'] = [
            'required' => 'required',
            'type' => 'search',
            'inputmode' => 'search',
            'autocomplete' => 'off',
            'autocorrect' => 'off',
            'autocapitalize' => 'off',
            'placeholder' => [
              t('Search'),
            ],
          ];
        }
      }
      break;
  }

  if (isset($form['#attributes']['class'])) {
    $classes = $form['#attributes']['class'] ?? [];
    _sector_radix_starter_attach_library_by_class($form, $classes);
  }
  
  if(isset($form['#entity_type'])){
    if($form['#entity_type'] === 'webform_submission') {
      $form['#attached']['library'][] = 'sector_radix_starter/webform';
    }
  }
}