<?php
use Drupal\media\Entity\Media;
use Drupal\Core\Template\Attribute;
/**
 * @file
 * Theme and preprocess functions for fields.
 */

/**
 * Implements hook_preprocess_field().
 */
function sector_preprocess_field(&$variables) {
  $element = $variables['element'];
  $field_name = $element['#field_name'];
  $bundle = $element['#bundle'];

  // Add bundle to template.
  $variables['bundle'] = $bundle;

  // Add a clean field name without the field_BUNDLE_ prefix.
  $safe_field_name_prefix = 'field_' . $bundle . '_';
  $variables['field_name_clean'] = str_replace($safe_field_name_prefix, '', $field_name);

  switch($variables['field_name_clean']) {
    case 'field_media_video_file' :
      $entity = $element['#object'] ?? null;

      if($entity->hasField('field_poster')) {
        $poster = $entity->get('field_poster')->getString();
        if($poster) {
          $poster_entity = Media::load($poster);
          $uri = $poster_entity->field_media_image->entity->getFileUri();
          $poster = \Drupal::service('file_url_generator')->generateAbsoluteString($uri);
          $variables['items'] = array_map(function($item) use ($poster) {
            $item['content']['#attributes']->setAttribute('poster', $poster);
            return $item;
          }, $variables['items']);
        }
      }

      if($entity->hasField('field_subtitle_track')) {
        $subtitle = $entity->get('field_subtitle_track')->getString();
        if($subtitle) {
          $subtitle_entity = Media::load($subtitle);
          $uri = $subtitle_entity->field_media_document->entity->getFileUri();
          $subtitle = \Drupal::service('file_url_generator')->generateAbsoluteString($uri);
          $variables['items'] = array_map(function($item) use ($subtitle) {
            $item['content']['#attributes']->setAttribute('data-subtitle', $subtitle);
            return $item;
          }, $variables['items']);
        }
      }

      break;
  }
}

/**
 * Implements template_preprocess_filter_caption().
 */
function sector_preprocess_filter_caption(&$variables) {
  // Do this for img tags only.
  if (($variables['tag'] !== 'img')) {
    return;
  }

  // Add the figure-img class to the rendered image markup.
  libxml_use_internal_errors(TRUE);
  $doc = new DOMDocument();
  $doc->loadHTML($variables['node']);
  if ($image = $doc->getElementsByTagName('img')->item(0)) {
    $image->setAttribute('class', 'figure-img img-fluid');
    $variables['node'] = [
      '#markup' => $image->ownerDocument->saveHTML($image),
    ];
  }
}

/**
 * Implements theme_suggestions_field_alter().
 */
function sector_theme_suggestions_field_alter(&$suggestions, $variables) {
  $suggestions[] = 'field__' . $variables['element']['#entity_type'] . '__' . $variables['element']['#field_name'] . '__' . $variables['element']['#bundle'] . '__' . $variables['element']['#view_mode'];
}
