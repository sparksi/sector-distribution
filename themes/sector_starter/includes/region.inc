<?php

/**
 * @file
 * Theme and preprocess functions for blocks.
 */

function sector_starter_preprocess_region(&$variables) {
  $variables['#attached']['library'][] = 'sector_starter/' . $variables['region'];
}