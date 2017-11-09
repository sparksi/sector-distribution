<?php

namespace Drupal\sector_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides the search fly out block.
 *
 * @Block(
 *   id = "search_desktop_fly_out_control",
 *   admin_label = @Translation("Sector blocks - Search desktop fly-out control"),
 * )
 */
class SearchDesktopFlyOutControl extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['#theme'] = 'search_desktop_fly_out_control_block';

    return $build;
  }
}