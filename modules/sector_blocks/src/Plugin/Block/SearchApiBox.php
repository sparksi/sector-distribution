<?php

namespace Drupal\sector_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides the search api box block. Replicates the default search block design.
 *
 * @Block(
 *   id = "search_api_box",
 *   admin_label = @Translation("Sector blocks - Search API block"),
 * )
 */
class SearchApiBox extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['#theme'] = 'search_api_box';

    return $build;
  }
}