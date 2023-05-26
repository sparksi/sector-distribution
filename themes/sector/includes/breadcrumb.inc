<?php
/**
 * Implements template_preprocess_breadcrumb().
 *
 * Set the current path at the end of the breadcrumbs.
 */
function sector_preprocess_breadcrumb(&$variables) {
  $request = \Drupal::request();
  $route_obj = \Drupal::routeMatch()->getRouteObject();
  // Get the title & add it to the end of the crumbs.
  if ($page_title = \Drupal::service('title_resolver')->getTitle($request, $route_obj)) {
    $variables['breadcrumb'][] = [
      'text' => $page_title,
      'url' => $request->getRequestUri(),
      'attributes' => [
        'aria-current' => "page",
      ],
    ];
  }
  // Set the cache context based on URL, so we always get the right crumb at
  // the end.
  $variables['#cache']['contexts'][] = 'url.path';
}
