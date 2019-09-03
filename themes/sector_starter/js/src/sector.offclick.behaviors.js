/**
 * Offclick javascript
 *
 */
(function ($) {
  const clickTrigger = Modernizr.touch ? 'touchstart' : 'click';

  // const offclickRegions = []; // Whitelist of regions to prevent offclick event trigger

  // Behaviours that run during OffClick.
  const offClickBehaviours = [
    'flyoutMenu',
    'flyoutSearch',
  ];

  /**
   * Off click for the flyout search and flyout menu
   *
   * Will also accept additional custom behaviours via addBehaviour.
   */

  Drupal.behaviors.offRegionClick = {
    attach: (context) => {
      // Detect a click outside the element and hide.
      // https://css-tricks.com/dangers-stopping-event-propagation/
      $(document).on(clickTrigger, '.site', (event) => {
        const match = ($(event.target).parents('.js-offclick-whitelist').length > 0);
        if (!match) {
          for (const offClickBehaviour in offClickBehaviours) {
            Drupal.behaviors[offClickBehaviours[offClickBehaviour]].close(context);
          }
        }
      });
    },
    addBehaviour: (behavior) => {
      if (offClickBehaviours.indexOf(behavior) === -1) {
        offClickBehaviours.push(behavior);
      }
    },
  };
}(jQuery));
