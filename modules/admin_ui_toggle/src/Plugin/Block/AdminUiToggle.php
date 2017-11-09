<?php

namespace Drupal\admin_ui_toggle\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides the admin ui toggle block.
 *
 * @Block(
 *   id = "admin_ui_toggle",
 *   admin_label = @Translation("Sector blocks - Admin UI toggle"),
 * )
 */
class AdminUiToggle extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $items = array();

    return array(
      '#theme' => 'admin_ui_toggle',
      '#attached' => [
        'library' => [
          'admin_ui_toggle/admin-ui-toggle'
        ],
      ],
    );
  }
}