<?php

namespace Drupal\sector_starterkit;

use Drupal\Component\Serialization\Yaml;
use Drupal\Core\Theme\StarterKitInterface;

final class StarterKit implements StarterKitInterface {

  /**
   * {@inheritdoc}
   */
  public static function postProcess(string $working_dir, string $machine_name, string $theme_name): void {
    $info_file = "$working_dir/$machine_name.info.yml";
    $info = Yaml::decode(file_get_contents($info_file));
    $info['interface translation project'] = $machine_name;
    $info['interface translation server pattern'] = $machine_name;

    $info['components']['namespaces'][$machine_name] = $info['components']['namespaces']['sector_starterkit'];
    unset($info['components']['namespaces']['sector_starterkit']);
    unset($info['hidden']);
    file_put_contents($info_file, Yaml::encode($info));


    $fs = new Filesystem();
    $fs->rename("$working_dir/config/schema/sector_starterkit.schema.yml", "$working_dir/config/schema/$machine_name.schema.yml");
    $schema_file = "$working_dir/config/schema/$machine_name.schema.yml";
    $schema = Yaml::decode(file_get_contents($schema_file));
    $schema["$machine_name.settings"] = $schema['sector_starterkit.settings'];
    unset($schema['sector_starterkit.settings']);
    $schema["$machine_name.settings"]['label'] = "$machine_name settings";
    file_put_contents($schema_file, Yaml::encode($schema));

    // Rename references to libraries in templates.
    $iterator = new TemplateDirIterator(new \RegexIterator(
      new \RecursiveIteratorIterator(
        new \RecursiveDirectoryIterator("$working_dir/src/components/"), \RecursiveIteratorIterator::LEAVES_ONLY
      ), '/' . preg_quote('.twig') . '$/'
    ));
    foreach ($iterator as $template_file => $contents) {
      $new_template_content = preg_replace("/(attach_library\(['\")])sector_starterkit(\/.*['\"]\))/", "$1$machine_name$2", $contents);
      if (!file_put_contents($template_file, $new_template_content)) {
        echo "The template file $template_file could not be written.";
      }
    }

    // Rename functions in theme includes.
    $iterator = new \IteratorIterator(new \RegexIterator(
      new \RecursiveIteratorIterator(
        new \RecursiveDirectoryIterator("$working_dir/includes/"), \RecursiveIteratorIterator::LEAVES_ONLY
      ), '/' . preg_quote('.inc') . '$/'
    ));

    foreach ($iterator as $include_file => $contents) {
      if (!file_put_contents($include_file, preg_replace("/(sector_starterkit)/", "$machine_name", file_get_contents($include_file)))) {
        echo "The include file $include_file could not be written.";
      }
    }
  }

}

