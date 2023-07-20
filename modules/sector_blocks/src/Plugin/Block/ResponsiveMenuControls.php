<?php

namespace Drupal\sector_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides the responsive menu controls block.
 *
 * @Block(
 *   id = "responsive_menu_controls",
 *   admin_label = @Translation("Sector blocks - Responsive menu controls"),
 * )
 */
class ResponsiveMenuControls extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['#theme'] = 'responsive_menu_control_block';

    return $build;
  }
}