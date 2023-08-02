<?php

namespace Drupal\sector_workflow\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;

/**
 * Class RouteSubscriber.
 *
 * Listens to the dynamic route events.
 */
class RouteSubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  protected function alterRoutes(RouteCollection $collection) {
    // New permission check for for the revisions page.
    $collection->get('entity.node.version_history')->setRequirement('_permission', 'access revision history page');
  }
}
