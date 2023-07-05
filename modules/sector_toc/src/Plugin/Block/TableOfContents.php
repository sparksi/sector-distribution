<?php

namespace Drupal\sector_toc\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Template\Attribute;
use Drupal\Core\TypedData\Exception\MissingDataException;
use Drupal\node\Entity\Node;
use Drupal\node\NodeInterface;
use Illuminate\Support\Arr;
use Drupal\Core\Url;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides an example block.
 *
 * @Block(
 *   id = "sector_toc_default",
 *   admin_label = @Translation("Sector › Table of contents"),
 *   category = @Translation("Sector")
 * )
 */
class TableOfContents extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'selectors' => 'h2',
    ] + parent::defaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function build() {

    return [
        '#theme' => 'toc_block',
      '#data' => [ ],
      '#attached' => [
        'drupalSettings' => [
          'sector_table_of_contents' => [
            'selectors' => $this->configuration['selectors']
          ]
        ]
      ],
      '#cache' => [
        'tags' => [
          'sector_table_of_contents',
        ],
        'contexts' => [
          'user.roles:anonymous'
        ]
      ]
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {

    $form['selectors'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Selectors'),
      '#default_value' => $this->configuration['selectors'],
      '#maxlength' => 255,
      '#size' => 32,
      '#weight' => '4',
      '#placeholder' => 'CSS flavoured definition: h2, h3:not(.title) etc.'
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    $this->configuration['selectors'] = $form_state->getValue('selectors');
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheContexts() {
    // @see https://www.drupal.org/developing/api/8/cache/contexts.
    // If you depends on \Drupal::routeMatch().
    // You must set context of this block with 'route' context tag.
    // Every new route this block will rebuild.
    return Cache::mergeContexts(parent::getCacheContexts(), ['url.path']);
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheTags(): array {
    return Cache::mergeTags(parent::getCacheTags(), ['sector_table_of_contents']);
  }

}
