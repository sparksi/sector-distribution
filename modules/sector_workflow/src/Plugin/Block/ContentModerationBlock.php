<?php

namespace Drupal\sector_workflow\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Extension\ModuleHandler;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\node\NodeInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\sector_workflow\WorkflowExtraBase;
use Drupal\content_moderation\Form\EntityModerationForm;
use Drupal\Core\Form\FormBuilderInterface;

/**
 * Provides a 'ContentModerationBlock' block.
 *
 * @Block(
 *  id = "content_moderation_block",
 *  admin_label = @Translation("Content moderation block"),
 * )
 */
class ContentModerationBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * The module handler.
   *
   * @var \Drupal\Core\Extension\ModuleHandler
   */
  protected $moduleHandler;

  /**
   * The form builder.
   *
   * @var \Drupal\Core\Form\FormBuilderInterface
   */
  protected $formBuilder;

  /**
   * Constructs a new ContentModerationBlock object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param string $plugin_definition
   *   The plugin implementation definition.
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    ModuleHandler $module_handler,
    FormBuilderInterface $form_builder
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->moduleHandler = $module_handler;
    $this->formBuilder = $form_builder;
  }
  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('module_handler'),
      $container->get('form_builder')
    );
  }
  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $workflowExtrasBase = new WorkflowExtraBase();
    // Get the current node from the route.
    /* @var $entity NodeInterface */
    $entity = $workflowExtrasBase->getEntityFromRoute('node');
    var_dump($entity->get('moderation_state'));
    if (!empty($entity) && !empty($entity->get('moderation_state')) && !$entity->get('moderation_state')->isEmpty() && $this->moduleHandler->moduleExists('content_moderation')) {
      // Further conditions to judge if we should render the form.
      // This all seems hacky. There must be a better option here than a massive if()..
      // TODO find out/think about it more.
      $validFormRender = $entity->isLatestRevision() || $entity->getRevisionId() == $entity->id() || $entity->isDefaultRevision();
      if ($validFormRender) {
        // Get the content moderation form render array.
        $contentModerationForm = $this->formBuilder->getForm(EntityModerationForm::class, $entity);
        if (!empty($contentModerationForm)) {
          // Render the form into the block.
          $build['content_moderation_block'] = $contentModerationForm;
        }
      }
    }
    return $build;
  }

  public function getCacheMaxAge() {
    // TODO - We could probably cache this by Entity..
    return 0;
  }

}
