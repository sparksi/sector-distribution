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

  public static function copySectorDefaultBlocks($activeThemeName = 'sector_starter') {
    $block_ids = \Drupal::entityQuery('block')->condition('theme', 'sector')->execute();

    foreach ($block_ids as $block_id) {
      $parent_block = \Drupal\block\Entity\Block::load($block_id);

      $new_id = str_replace('sector', $activeThemeName, $parent_block->get('id'));
      $child_block = $parent_block->createDuplicateBlock($new_id, $activeThemeName);

      $child_block->save();
    }
  }
}
