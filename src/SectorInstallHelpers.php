<?php

namespace Drupal\sector;

use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Config\ConfigFactoryInterface;

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

  public function addAntibotConfig() {
    $key = 'form_ids';
    $antibotConfig = $this->configFactory->getEditable('antibot.settings');
    $formIds = $antibotConfig->get($key);
    $formIds[] = 'webform_submission_*';
    $antibotConfig->set($key, $formIds)
      ->save();
  }
}
