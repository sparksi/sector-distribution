<?php

/**
 * @file
 * Theme and preprocess functions for html wrapper.
 */

function sector_starter_preprocess_html(&$variables) {
    if (!\Drupal::currentUser()->isAnonymous()) {
        $variables['#attached']['library'][] = 'sector_starter/contextual';
    }
}