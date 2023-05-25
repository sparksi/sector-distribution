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
    foreach ($nodes as $node) {
      $pathautoGenerator->updateEntityAlias($node, 'insert');
    }
  }

  public static function buildSearchIndex($indexName) {
    $index = Index::load($indexName);
    if($index) {
      $index->indexItems();
    }
  }
}
