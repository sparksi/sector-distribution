<?php
use Drupal\Core\Asset\AttachedAssetsInterface;

// refactor/remove this when sdc is fixed to adhere to CSS group ordering
function sector_css_alter(&$css, AttachedAssetsInterface $assets) {
    foreach($css as $fileName => $library) {
      if(str_contains($fileName, 'modules/sdc')) {
        $css[$fileName]['group'] = CSS_STATE;
      }
    }
}