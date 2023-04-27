<?php

/**
 * @file
 * Theme and preprocess functions for html wrapper.
 */

function SECTOR_SUBTHEME_MACHINE_NAME_preprocess_html(&$variables) {
    if (!\Drupal::currentUser()->isAnonymous()) {
        $variables['#attached']['library'][] = 'SECTOR_SUBTHEME_MACHINE_NAME/contextual';
    }
}