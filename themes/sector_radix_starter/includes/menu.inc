<?php

use Drupal\Core\Render\Markup;
/**
 * Implements hook_preprocess_menu().
 *
 * Add a custom CSS class to unpublished menu items so authenticated users
 * don't get worried!
 * Inspired by https://bobbis.com/blog/adding-html-menu-item-drupal-8
 */
function sector_radix_starter_preprocess_menu(&$variables) {
  if (\Drupal::currentUser()->isAuthenticated() && $variables['menu_name'] !== 'admin') {
    _recursive_menu_item_unpublish_check($variables['items']);
  }
  foreach ($variables['items'] as $key => $item) {
    // TODO - set the data ID only for the megamenu - Not all menus
    $attribute = &$variables['items'][$key]['attributes'];

    //$key might change if the link is pointing to another place
    //but is also a very ugly id and some times very big
    //$attribute->setAttribute('id', $key);

    //so to get a smaller id from previous key
    //use http://php.net/manual/en/function.hash.php
    $key_hash = hash('crc32b', $key);
    $attribute->setAttribute('data-id', $key_hash);
  }
}

/**
 * Recursive function. Adds a class is a menu item us unpublished
 */
function _recursive_menu_item_unpublish_check(&$items) {
  foreach ($items as $key => &$item) {
    // We only want to look at internal links.
    if (!$item['url']->isExternal() && $item['url']->isRouted()) {
      // RouteParameters gets the NID of the linked item.
      $routeParameters = $item['url']->getRouteParameters();
      $nid = (!empty($routeParameters['node'])) ? $routeParameters['node'] : FALSE;
      if (!empty($nid)) {
        // Check the node status.
        $query = \Drupal::entityQuery('node');
        $query->condition('status', 0);
        $query->condition('nid', $nid);
        $entity = $query->execute();
        // It is possible that an internal menu URL does not reference a node.
        if (!empty($entity)) {
          // add .menu-unpublished css class
          $item['attributes']->addClass('menu-item-is-unpublished');

          // Add screen reader indication of unpublished state.
          $item['title'] = Markup::create('<span class="sr-only">unpublished </span>' . $item['title']);
        }
      }
    }
    // Recursively run this over the children.
    if ($item['below']) {
      _recursive_menu_item_unpublish_check($item['below']);
    }
  }
}

