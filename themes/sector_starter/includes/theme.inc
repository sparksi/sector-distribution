<?php

/**
 * @file
 * Custom theme hooks.
 */

/**
 * Implements hook_library_info_build().
 * Automatically creates components libraries (Not visible in theme's libraries.yml file)
 * You can directly use the component name as a library, f.x
 *  {{ attach_library('sector_SUBTHEME_MACHINE_NAME/block') }}.
 */
function sector_starter_library_info_build() {
  $extensions = ['css', 'js'];

  $directories = [
    'base' => [
      'profiles/contrib/sector-distribution/themes/sector_starter/dist/layout'
    ],
    'layout' => [
      'profiles/contrib/sector-distribution/themes/sector_starter/dist/layout/regions'
    ],
    'component' => [
      'profiles/contrib/sector-distribution/themes/sector_starter/dist/components',
      'profiles/contrib/sector-distribution/themes/sector_starter/dist/drupal'
    ]
  ];

  $extensions = array_map('preg_quote', $extensions);
  $extensions = implode('|', $extensions);

  $libraries = [];
  foreach($directories as $weight => $subdirectories) {
    foreach($subdirectories as $directory) {

      if (!is_dir($directory)) {
        continue;
      }
      $file_scan = \Drupal::service('file_system')->scanDirectory($directory, "/{$extensions}$/");
      foreach ($file_scan as $file) {
        $parts = explode('.', $file->filename);
        $extension = end($parts);
        switch ($extension) {
          case 'css':
            $libraries[$file->name][$extension] = [
              "$weight" => [
                '/' . $file->uri => [],
              ],
            ];
            break;

          case 'js':
            $libraries[$file->name][$extension] = [
              '/' . $file->uri => ['attributes' => ['defer' => true]],
            ];
            break;
        }
      }
    }
  }

  //dpm($libraries);

  return $libraries;
}


