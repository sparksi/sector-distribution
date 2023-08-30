<?php

namespace Drupal\sector_custom_block;

use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\entityqueue\Entity\EntitySubqueue;

class SectorCustomBlockHelpers implements ContainerInjectionInterface {

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

  public static function setupEntityqueue() {

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
