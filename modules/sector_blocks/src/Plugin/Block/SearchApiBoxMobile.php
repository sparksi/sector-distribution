<?php

namespace Drupal\sector_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides the search api box block. Replicates the default search block design.
 * Mobile version.
 *
 * @Block(
 *   id = "search_api_box_mobile",
 *   admin_label = @Translation("Sector blocks - Search API block (mobile)"),
 * )
 */
class SearchApiBoxMobile extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['#theme'] = 'search_api_box_mobile';

    return $build;
  }
}