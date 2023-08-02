<?php

namespace Drupal\sector_workflow;

use Drupal\content_moderation\ModerationInformationInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\node\NodeInterface;
use Drupal\media\MediaInterface;
use Drupal\Core\Cache\Cache;

class WorkflowExtraBase {

  public function __construct() {
  }

  /**
   * Helper function.
   *
   * Get the new text for the local task titles depending on the route passed.
   *
   * @param $taskName
   * @return TranslatableMarkup
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function getNewTextForLocalTask($taskName) {
    switch ($taskName) {
      case 'content_moderation.workflows:node.latest_version_tab':
        return new TranslatableMarkup('View draft');
      case 'entity.node.edit_form':
        $node = $this->getEntityFromRoute('node');
        if ($node) {
          if (!$node->isPublished()) {
            return new TranslatableMarkup('Edit draft');
          }
          /* @var $moderationInformation ModerationInformationInterface */
          // TODO inject this.
          $moderationInformation = \Drupal::service('content_moderation.moderation_information');
          $hasPendingRevision = $moderationInformation->hasPendingRevision($node);
          if ($hasPendingRevision) {
            return new TranslatableMarkup('Edit draft');
          }
          else {
            return new TranslatableMarkup('New draft');
          }
        }
        break;
      case 'entity.node.canonical':
        $routeName = \Drupal::routeMatch()->getRouteName();
        $node = $this->getEntityFromRoute('node');
        if (!$node->isPublished()) {
          if ($routeName == 'entity.node.latest_version' || $routeName == 'entity.node.edit_form') {
            // TODO inject this
            $parentNode = \Drupal::entityTypeManager()->getStorage('node')->load($node->id());
            if ($parentNode->isPublished()) {
              return new TranslatableMarkup('View published');
            }
          }
          return new TranslatableMarkup('View draft');
        }
        return new TranslatableMarkup('View published');
    }
  }

  /**
   * Helper function.
   *
   * Gets the current node from the route.
   *
   * Needed to get the correct node when viewing a revision.
   * Credit for this code goes to Berdir: https://www.drupal.org/u/berdir
   *
   * Taken from https://www.drupal.org/project/drupal/issues/2730631#comment-12667635
   * and adjusted slightly.
   */
  public function getEntityFromRoute($entityTypeId) {
    $entity = NULL;
    // TODO inject this.
    if (\Drupal::routeMatch()->getParameter($entityTypeId)) {
      $entity = \Drupal::routeMatch()->getParameter($entityTypeId);
    }
    // The node revision page does not upcast the node.
    if (\Drupal::routeMatch()->getParameter($entityTypeId . '_revision')) {
      $revision_id = \Drupal::routeMatch()->getParameter($entityTypeId . '_revision');
      if ($revision_id > 0) {
        // TODO inject this.
        return \Drupal::entityTypeManager()->getStorage($entityTypeId)->loadRevision($revision_id);
      }
    }
    switch ($entityTypeId) {
      case 'node':
        if ($entity instanceof NodeInterface) {
          return $entity;
        }
        break;
      case 'media':
        if ($entity instanceof MediaInterface) {
          return $entity;
        }
        break;
    }
  }

  /**
   * Helper function.
   *
   * Gets the (formatted) date from the given revision.
   *
   * @param $revision
   * @return string
   * @throws \Exception
   */
  public function getRevisionDate(NodeInterface $revision, $format = 'l \t\h\e jS \of F Y h:i:s A') {
    $revisionTimestamp = $revision->getRevisionCreationTime();
    $revisionDateObj = new \DateTime();
    $revisionDateObj->setTimestamp($revisionTimestamp);
    return $revisionDateObj->format($format);
  }

  /**
   * Helper function.
   *
   * Gets the author for the given revision.
   *
   * @param $revision
   * @return mixed
   */
  public function getRevisionAuthor(NodeInterface $revision) {
    return $revision->getRevisionUser()->getAccountName();
  }
}
