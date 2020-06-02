<?php

/**
 * @file
 * Theme and preprocess functions for users.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_FORM_ID_alter().
 *
 * Attaches library to the login form.
 */
function sector_radix_starter_form_user_login_form_alter(&$form, FormStateInterface $form_state, $form_id) {
  $form['#attached']['library'][] = 'sector_radix_starter/user-login';
}
