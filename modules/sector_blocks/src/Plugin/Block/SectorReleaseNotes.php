<?php

namespace Drupal\sector_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides the Sector Release Notes Block
 *
 * @Block(
 *   id = "sector_release_notes",
 *   admin_label = @Translation("Sector blocks - Sector Release Notes block"),
 * )
 */
class SectorReleaseNotes extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    $current_path = \Drupal::service('path.current')->getPath();
    return [
      '#markup' => $this->t('<div data-drupal-messages="" class="messages-list"><div role="contentinfo" aria-labelledby="message-status-title" class="messages-list__item messages messages--status" style="position: relative;">Sector is getting Drupal 10 ready! We will release a series of updates to the Sector 9.5.x branch and additional modules to support the upgrade process. Keep up-to-date on <a href="https://www.sector.nz/news/news-and-updates-sector-9-sector-10-upgrade-path" target="_blank">News and Updates for the Sector 9 to Sector 10 upgrade path on Sector.nz</a><a  href="/admin/structure/block/manage/sectorblocksreleasenotesblock/delete?destination='.$current_path.'" style="position: absolute; top: 5px; right: 15px; display: block; text-decoration:none;" >x</a> </div>
        </div>'),
    ];
  }
}