<?php

namespace Drupal\sector;

use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\node\Entity\Node;
use Drupal\search_api\Entity\Index;

class SectorInstallHelpers implements ContainerInjectionInterface {

  /**
   * The Config factory service.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  public function __construct(ConfigFactoryInterface $configFactory) {
    $this->configFactory = $configFactory;
  }

  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory')
    );
  }

  public static function regenerateNodeAliases() {
    $nodes = Node::loadMultiple();
    $pathautoGenerator = \Drupal::service('pathauto.generator');

    // Set author to be Robot.
    $user = user_load_by_name('Robot');

    foreach ($nodes as $node) {
      $pathautoGenerator->updateEntityAlias($node, 'insert');
      if ($user) {
        $node->setOwnerId($user->id());
        $node->save();

        \Drupal::logger('sector')->notice('Regenerated node alias for #%title', [
          '%title' => $node->getTitle(),
        ]);
      }
    }
  }

  public static function buildSearchIndex($indexName) {
    $index = Index::load($indexName);
    if($index) {
      $index->indexItems();
    }
  }

  public static function copySectorDefaultBlocks($activeThemeName = 'sector_demo') {
    $block_ids = \Drupal::entityQuery('block')->condition('theme', 'sector')->execute();

    foreach ($block_ids as $block_id) {
      $parent_block = \Drupal\block\Entity\Block::load($block_id);

      $new_id = str_replace('sector', $activeThemeName, $parent_block->get('id'));
      $child_block = $parent_block->createDuplicateBlock($new_id, $activeThemeName);

      $child_block->save();
    }
  }

  // I wanted to put this in sector_custom_blocks module :-(
  public static function setupCustomBlockQueue() {

    $queue_id = 'homepage_promotion_cards';

    // Load the entity queue.
    $entity_queue = \Drupal::entityTypeManager()->getStorage('entity_queue')->load($queue_id);

    if ($entity_queue) {
        $block_ids = [
            '58a7f20e-651c-4821-b5f8-0b469a5d0291',
            '26441a99-98ec-4b96-a85b-81255116541b',
            '4adddefb-9f1f-4ee5-af7d-a12b257ddf34'
        ];

        $subqueue = EntitySubqueue::load($queue_id);

        foreach($block_ids as $block_id) {
            $block_content = \Drupal::service('entity.repository')->loadEntityByUuid('block_content', $block_id);

            if ($block_content) {
                $subqueue->addItem($block_content);
                $subqueue->save();
            }
            else {
                \Drupal::logger('sector_promo_magnet')->error('Entity not found.');
            }
        }
    }
    else {
        \Drupal::logger('sector_promo_magnet')->error('Entity queue not found.');
    }
  }
}
