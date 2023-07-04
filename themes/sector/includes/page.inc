<?php
/**
 * @file
 * Theme and preprocess functions for pages.
 */
use Drupal\node\Entity\Node;
use Drupal\taxonomy\Entity\Term;
use Drupal\node\NodeInterface;

/**
 * Implements sector_preprocess_page().
 */
function sector_preprocess_page(&$variables) {
  // Add the site name to the page.
  $variables['site_name'] = \Drupal::config('system.site')->get('name');

  $entity = \Drupal::routeMatch()->getParameter('node');
  if (!empty($entity)) {
    $variables['page']['isPublishedClass'] = $entity->isPublished() ? 'page--is-published' : 'page--is-unpublished';

    if ($entity->hasField('field_content_options')) {
      $node_content_options = $entity->get('field_content_options')->referencedEntities();

      // Loops through each taxonomy term checking if the name of the term is
      // the same as $taxonomy_name
      $taxonomy_uuid = 'ce6a9fe6-0d6b-4ea4-afe8-7d505a7fe57b';
      foreach($node_content_options as $key => $value) {
        if($value->uuid() == $taxonomy_uuid) {
          // remove the sidebars from the page.
          unset($variables['page']['content_prefix']);
          unset($variables['page']['content_suffix']);
          break;
        }
      }
    }

    if ($entity->hasField('field_text_placement')) {
      $text_placement_classes = $entity->get('field_text_placement')->getValue();
      if ($text_placement_classes) {
        foreach($text_placement_classes as $text_placement_class)
        $variables['page_utility_classes'][] = 'text-placement--' . $text_placement_class['value'];
      }
    }
  }
}

/**
 * Implements hook_theme_suggestions_hook_alter().
 */
function sector_theme_suggestions_page_alter(array &$suggestions, array $variables) {
  // * Add a template suggestions for node type.
  /** @var \Drupal\node\NodeInterface $node */
  if ($node = \Drupal::routeMatch()->getParameter('node')) {
    if (is_numeric($node)) {
      $node = Node::load($node);
    }

    $suggestions[] = 'page__node__' . $node->bundle();
  }

  $current_path = \Drupal::service('path.current')->getPath();
  $result = \Drupal::service('path_alias.manager')->getAliasByPath($current_path);

  $path_alias = trim($result, '/');
  $path_alias = str_replace('/', '-', $path_alias);
  $path_alias = str_replace('-', '_', $path_alias);

  $suggestions[] = 'page__path__' . $path_alias;

  // * Defines custom theme suggestions based on the route.
  $route_name = \Drupal::request()->attributes->get('_route');
  if ('system.404' === $route_name) {
    $suggestions[] = 'page__404';
  }
  if ('system.403' === $route_name) {
    $suggestions[] = 'page__403';
  }

  // * Adds page node type theme suggestion.
  $route_matcher = \Drupal::routeMatch();
  $node = $route_matcher->getParameter('node');
  $node_revision = $route_matcher->getParameter('node_revision');
  if($node_revision !== NULL) {
      $node = is_object($node_revision) ? $node_revision : \Drupal::entityTypeManager()->getStorage('node')->loadRevision($node_revision);
  }

  if ($node = \Drupal::routeMatch()->getParameter('node')) {
    if ($node instanceof NodeInterface) {
      $suggestions[] = 'page__node__' . $node->getType();
    }
  }

  // * Add view mode theme suggestions based on the vocabulary
  if (\Drupal::routeMatch()->getRouteName() == 'entity.taxonomy_term.canonical' && $tid = \Drupal::routeMatch()->getRawParameter('taxonomy_term')) {
    $term = Term::load($tid);
    $suggestions[] = 'page__taxonomy__' . $term->bundle();
  }
}