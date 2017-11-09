<?php

namespace Drupal\plain_text\Plugin\Filter;

use Drupal\filter\Plugin\FilterBase;
use Drupal\filter\FilterProcessResult;

/**
 * @Filter(
 *   id = "plain_text_filter",
 *   title = @Translation("Enforce plain text paste"),
 *   description = @Translation("If enabled, all text pasted directly into the CKEditor will be stripped of all tags and pasted as plain text."),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_HTML_RESTRICTOR,
 * )
 */
class PlainTextFilter extends FilterBase {

  public function process($text, $langcode) {
    // The text is processed using the JS that is loaded if this filter is
    // enabled. Thus we only need to return the same text sent to this function.
    $result = new FilterProcessResult($text);
    return $result;
  }
}