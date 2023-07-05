<?php
use Drupal\Core\Template\Attribute;

/**
 * @file
 * Theme and preprocess functions for nodes.
 */

 function sector_starter_preprocess_node(&$variables) {
    if($variables['page'] === false) {
      $variables['title_link_attributes'] = new Attribute();
    }
  }
