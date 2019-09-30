/**
 * Toggle javascript
 *
 */
(function ($) {
  /**
   * Create the onclick handlers for all js-toggles.
   *
   * This behaviour finds all classes starting with js-toggle and finds it's
   * appropriate js-target and adds the is-active class.
   *
   * To use this:
   *
   * Add a toggle class with a unique identifier to your toggle element.
   *  - js-toggle-{id} - E.G. js-toggle-promotion-slot
   * Add a target class that will be activated on the click of the toggle
   *  - js-target-{id} - E.G. js-target-promotion-slot
   *
   * E.G. -
   *
   * - Onclick handler gets added to js-toggle-promotion-slot
   * - js-toggle-promotion-slot is clicked
   * - Code tries to find js-target-promotion-slot
   * - Toggles the promotion-slot-is-active class if it's found.
   *
   * Optionally detect a click outside your element and hide it.
   *
   * - See offclick.behaviors.js
   *
   * In order to impliment offclick you'll need to create a new behaviour
   * within <sitename>.behaviours.js
   *
   * E.G -
   *
   *    Drupal.behaviors.promotionSlotOffRegionClick = {
   *      attach: () => {
   *        Drupal.behaviors.offRegionClick.addBehaviour('promotionSlotOffRegionClick');
   *      },
   *      close: () => {
   *        $('.js-target-promotion-slot').removeClass('promotion-slot-is-active');
   *      }
   *    };
   *
   * Then add the '.js-offclick-whitelist' class to your toggle and/or target
   * element parent.
   *
   * @TODO - Allow for js-offclick-whitelist class to be placed directly on
   * trigger element
   *
   * Flush Drupal and Browser caches for the new behaviour to register.
   *
   * @type {{attach: attach}}
   */
  Drupal.behaviors.attachToggleHandlers = {
    attach: () => {
      $('[class*="js-toggle-"]').once().on('click', (event) => {
        // Turn classList into array with es6 spread operator.
        const classList = [...event.currentTarget.classList];
        // Find the toggle class.
        const toggle = classList.filter((className) => className.substr(0, 10) === 'js-toggle-');
        if (toggle.length > 0) {
          // strip js-toggle- to find the unique ID.
          const toggleId = toggle[0].substr(10);
          // Find the target class and toggle is - {ID}-is-active class.
          if ($(`.js-target-${toggleId}`).length > 0) {
            $(`.js-target-${toggleId}`).toggleClass(`${toggleId}-is-active`);
            // TODO - Reconsider this? Do we need to make this smarter?
            event.preventDefault();
          }
        }
      });
    },
  };
}(jQuery));
