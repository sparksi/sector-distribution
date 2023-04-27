<?php

declare(strict_types = 1);

namespace Drush\Commands\sector;

use Consolidation\AnnotatedCommand\CommandData;
use Consolidation\AnnotatedCommand\CommandError;
use Drupal\Component\Utility\UrlHelper;
use Drupal\sector\SubThemeGenerator;
use Drush\Commands\DrushCommands;
use Robo\Contract\BuilderAwareInterface;
use Robo\State\Data as RoboStateData;
use Robo\TaskAccessor;
use Symfony\Component\Filesystem\Filesystem;

use Robo\Task\Archive\Tasks as ArchiveTaskLoader;
use Robo\Task\Filesystem\Tasks as FilesystemTaskLoader;
use Symfony\Component\Finder\Finder;

/**
 * Class SubThemeCommands.
 */
class SubThemeCommands extends DrushCommands implements BuilderAwareInterface {

  use TaskAccessor;
  use ArchiveTaskLoader;
  use FilesystemTaskLoader;

  /**
   * {@inheritdoc}
   *
   * @var \Drupal\sector\SubThemeGenerator
   */
  protected $subThemeCreator;

  /**
   * {@inheritdoc}
   *
   * @var \Symfony\Component\Filesystem\Filesystem
   */
  protected $fs;

  /**
   * {@inheritdoc}
   */
  public function __construct(?SubThemeGenerator $subThemeCreator = NULL, ?Filesystem $fs = NULL) {
    $this->subThemeCreator = $subThemeCreator ?: new SubThemeGenerator();
    $this->fs = $fs ?: new Filesystem();

    parent::__construct();
  }

  /**
   * Creates a sector sub-theme.
   *
   * @command sector:create
   * @aliases sector
   *
   * @bootstrap full
   *
   * @option string $machine-name
   *   The machine-readable name of your sub-theme. This will be auto-generated
   *   from the human-readable name if omitted.
   * @option string $description
   *   The description of your sub-theme
   * @option string $destination
   *   The destination of your sub-theme.
   * @option string $kit
   *   The name or url of the starter kit to use.
   *
   * @usage drush sector:create 'My Theme'
   *   Creates a sector sub-theme called "My Theme", using the default options.
   * @usage drush sector:create 'My Theme' --machine_name=my_theme
   *   Creates a sector sub-theme called "My Theme" with a specific machine name.
   *
   * @sectorArgLabel name
   * @sectorOptionMachineName machine-name
   */
  public function generateSubTheme(
    string $name,
    array $options = [
      'machine-name' => '',
      'description' => '',
      'destination' => '',
      'kit' => 'default',
    ]
  ) {
    $kit = $options['kit'];

    // @todo Use extension service.
    $sectorDir = \Drupal::service('extension.list.theme')->getPath('sector');
    $srcDir = "$sectorDir/src/kits/{$kit}";

    // Find kit from other active themes.
    /** @var \Drupal\Core\Extension\Extension[] $themes */
    foreach (\Drupal::service('theme_handler')->listInfo() as $theme) {
      $path = "{$theme->getPath()}/src/kits/{$kit}";
      if ($this->fs->exists($path)) {
        $srcDir = $path;
      }
    }

    $dstDir = "{$options['destination']}/{$options['machine-name']}";

    $cb = $this->collectionBuilder();
    $cb->getState()->offsetSet('srcDir', $srcDir);

    if (UrlHelper::isValid($kit, TRUE)) {
      $kitUrl = $kit;
      $cb->addTask($this->taskTmpDir());

      $cb->addCode(function (RoboStateData $data) use ($kitUrl): int {
        $logger = $this->logger();
        $logger->debug(t('download sector starter kit from @kitUrl', array('@kitUrl' => "<info>$kitUrl</info>")));

        $fileName = $this->getFileNameFromUrl($kitUrl);
        $packDir = "{$data['path']}/pack";
        $data['packPath'] = "$packDir/$fileName";

        try {
          $this->fs->mkdir($packDir);
          $this->fs->copy($kitUrl, $data['packPath']);
        }
        catch (\Exception $e) {
          $logger->error($e->getMessage());

          return 1;
        }

        return 0;
      });

      $cb->addCode(function (RoboStateData $data): int {
        $logger = $this->logger();
        $logger->debug(
          t(
            'extract downloaded sector starter kit from @packPath to @srcDir',
            array(
              '@packPath' => "<info>$data[packPath]</info>", 
              '@srcDir' => "<info>$data[srcDir]</info>"
            )
          )
        );

        $data['srcDir'] = "{$data['path']}/kit";

        /** @var \Drupal\Core\Archiver\ArchiverManager $extractorManager */
        $extractorManager = \Drupal::service('plugin.manager.archiver');

        try {
          /** @var \Drupal\Core\Archiver\ArchiverInterface $extractorInstance */
          $extractorInstance = $extractorManager->getInstance(['filepath' => $data['packPath']]);
          $extractorInstance->extract($data['srcDir']);
        }
        catch (Exception $e) {
          $this->logger()->error($e->getMessage());

          return 1;
        }

        $topLevelDir = $this->getTopLevelDir($data['srcDir']);
        if ($topLevelDir) {
          $data['srcDir'] = $topLevelDir;
        }

        return 0;
      });
    }

    $cb->addCode(function (RoboStateData $data) use ($dstDir): int {
      $logger = $this->logger();
      $logger->debug(
        t(
          'copy sector starter kit from @srcDir to @dstDir',
          array(
            '@srcDir' => "<info>$data[srcDir]</info>",
            '@dstDir' => "<info>$dstDir</info>"
          )
        )
      );

      try {
        $this->fs->mirror($data['srcDir'], $dstDir);
      }
      catch (\Exception $e) {
        $this->logger()->error($e->getMessage());

        return 1;
      }

      return 0;
    });

    $cb->addCode(function () use ($name, $options, $dstDir): int {
      $logger = $this->logger();
      $logger->debug(
        t(
          'customize sector starter kit in @dstDir',
          array(
            '@dstDir' => "<info>$dstDir</info>"
          )
        )
      );

      $this
        ->subThemeCreator
        ->setDir($dstDir)
        ->setMachineName($options['machine-name'])
        ->setName($name)
        ->setDescription($options['description'])
        ->generate();

      return 0;
    });

    return $cb;
  }

  /**
   * {@inheritdoc}
   *
   * @hook validate sector:create
   */
  public function onHookValidatesectorGenerateSubTheme(CommandData $commandData): ?CommandError {
    $input = $commandData->input();

    if (!$input->getOption('kit')) {
      $input->setOption('kit', 'default');
    }

    if (!$input->getOption('description')) {
      $input->setOption('description', $this->getDefaultDescription());
    }

    $machineName = $input->getOption('machine-name');
    if (!$machineName) {
      $machineName = $this->convertLabelToMachineName($input->getArgument('name'));
      $input->setOption('machine-name', $machineName);
    }

    $destination = $input->getOption('destination');
    if (!$destination) {
      $destination = $this->getDefaultDestination();
      $input->setOption('destination', $destination);
    }

    $dstDir = "$destination/$machineName";
    if ($this->fs->exists($dstDir) && !$this->isDirEmpty($dstDir)) {
      return new CommandError("Destination directory '$dstDir' not empty", 1);
    }

    return NULL;
  }

  /**
   * {@inheritdoc}
   *
   * @hook validate @sectorArgLabel
   *
   * @return null|\Consolidation\AnnotatedCommand\CommandError
   *   Returns null or CommandError.
   */
  public function onHookValidatesectorArgLabel(CommandData $commandData): ?CommandError {
    $annotationKey = 'sectorArgLabel';
    $annotationData = $commandData->annotationData();
    if (!$annotationData->has($annotationKey)) {
      return NULL;
    }

    $commandErrors = [];
    $argNames = $this->parseMultiValueAnnotation($annotationData->get($annotationKey));
    foreach ($argNames as $argName) {
      $commandErrors[] = $this->onHookValidatesectorArgLabelSingle($commandData, $argName);
    }

    return $this->aggregateCommandErrors($commandErrors);
  }

  /**
   * {@inheritdoc}
   */
  protected function onHookValidatesectorArgLabelSingle(CommandData $commandData, string $argName): ?CommandError {
    $label = $commandData->input()->getArgument($argName);
    if (strlen($label) === 0) {
      return NULL;
    }

    if (!preg_match('/^[^\t\r\n]+$/ui', $label)) {
      return new CommandError("Tabs and new line characters are not allowed in argument '$argName'.");
    }

    return NULL;
  }

  /**
   * {@inheritdoc}
   *
   * @hook validate @sectorOptionMachineName
   */
  public function onHookValidatesectorOptionMachineName(CommandData $commandData) {
    $annotationKey = 'sectorOptionMachineName';
    $annotationData = $commandData->annotationData();
    if (!$annotationData->has($annotationKey)) {
      return NULL;
    }

    $commandErrors = [];
    $optionNames = $this->parseMultiValueAnnotation($annotationData->get($annotationKey));
    foreach ($optionNames as $optionName) {
      $commandErrors[] = $this->onHookValidatesectorOptionMachineNameSingle($commandData, $optionName);
    }

    return $this->aggregateCommandErrors($commandErrors);
  }

  /**
   * {@inheritdoc}
   */
  protected function onHookValidatesectorOptionMachineNameSingle(CommandData $commandData, $optionName): ?CommandError {
    $machineNames = $commandData->input()->getOption($optionName);
    if (!is_array($machineNames)) {
      $machineNames = strlen($machineNames) !== 0 ? [$machineNames] : [];
    }

    $invalidMachineNames = [];
    foreach ($machineNames as $machineName) {
      if (!preg_match('/^[a-z][a-z0-9_]*$/', $machineName)) {
        $invalidMachineNames[] = $machineName;
      }
    }

    if ($invalidMachineNames) {
      return new CommandError("Following machine-names are invalid in option '$optionName': " . implode(', ', $invalidMachineNames));
    }

    return NULL;
  }

  /**
   * {@inheritdoc}
   */
  protected function parseMultiValueAnnotation(string $value): array {
    return $this->explodeCommaSeparatedList($value);
  }

  /**
   * {@inheritdoc}
   */
  protected function explodeCommaSeparatedList(string $items): array {
    return array_filter(
      preg_split('/\s*,\s*/', trim($items)),
      'mb_strlen'
    );
  }

  /**
   * {@inheritdoc}
   *
   * @param \Consolidation\AnnotatedCommand\CommandError[] $commandErrors
   *   Command errors.
   */
  protected function aggregateCommandErrors(array $commandErrors): ?CommandError {
    $errorCode = 0;
    $messages = [];
    /** @var \Consolidation\AnnotatedCommand\CommandError $commandError */
    foreach (array_filter($commandErrors) as $commandError) {
      $messages[] = $commandError->getOutputData();
      $errorCode = max($errorCode, $commandError->getExitCode());
    }

    if ($messages) {
      return new CommandError(implode(PHP_EOL, $messages), $errorCode);
    }

    return NULL;
  }

  /**
   * {@inheritdoc}
   */
  protected function convertLabelToMachineName(string $label): string {
    return mb_strtolower(preg_replace('/[^a-z0-9_]+/ui', '_', $label));
  }

  /**
   * {@inheritdoc}
   */
  protected function getDefaultDestination(): string {
    if ($this->fs->exists('./themes/contrib') || $this->fs->exists('./themes/custom')) {
      return './themes/custom';
    }

    return './themes';
  }

  /**
   * {@inheritdoc}
   */
  protected function getDefaultDescription(): string {
    return 'A theme based on sector.';
  }

  /**
   * {@inheritdoc}
   */
  protected function isDirEmpty(string $dir): bool {
    return !(new \FilesystemIterator($dir))->valid();
  }

  /**
   * {@inheritdoc}
   */
  protected function getDirectDescendants(string $dir): Finder {
    return (new Finder())
      ->in($dir)
      ->depth('0');
  }

  /**
   * {@inheritdoc}
   */
  protected function getFileNameFromUrl(string $url): string {
    return pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_BASENAME);
  }

  /**
   * {@inheritdoc}
   */
  protected function getTopLevelDir(string $parentDir): string {
    $directDescendants = $this->getDirectDescendants($parentDir);
    $iterator = $directDescendants->getIterator();
    $iterator->rewind();
    /** @var \Symfony\Component\Finder\SplFileInfo $firstFile */
    $firstFile = $iterator->current();
    if ($directDescendants->count() === 1 && $firstFile->isDir()) {
      return $firstFile->getPathname();
    }

    return '';
  }

}
