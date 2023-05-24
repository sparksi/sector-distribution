<?php

/**
 * @file
 * Theme and preprocess functions for html wrapper.
 */

function sector_starter_preprocess_html(&$variables) {
    if (!\Drupal::currentUser()->isAnonymous()) {
        $variables['#attached']['library'][] = 'sector_starter/contextual';
    }

    // theme_get_setting('apply_glitter')
    if(theme_get_setting('brand')) {
        $brand = BlockContent::load(theme_get_setting('brand'));
        $brandmark = $brand->field_brand_mark->first();
        if(!$brandmark) {
            return;
        }

        $media = Media::load($brandmark->target_id);
        $fid = $media->field_media_image->target_id;
        $file = File::load($fid);

        $variables['page']['#attached']['html_head_link'][] = [
            [
              'rel' => 'shortcut icon',
              'type' => 'image/svg+xml',
              'href' => \Drupal::service('file_url_generator')->generateAbsoluteString($file->getFileUri())
            ]
        ];
    }
}