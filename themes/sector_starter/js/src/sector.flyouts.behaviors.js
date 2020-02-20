/**
 * Flyouts javascript
 *
 */
(function ($) {
  const clickTrigger = Modernizr.touch ? 'touchstart' : 'click';

  const fetchElementWithContext = (className, context) => $(className, context);

  /**
   * Flyout search
   */

  const searchTargets = {
    elem: '.search--flyout',
    toggle: '.js-toggle-search, .js-toggle-flyout-search',
  };

  /**
   * Flyout menu
   */

  const flyoutMenuTargets = {
    elem: '.is-target-for-flyout-menu', // Add this class to the menu block/s you wish to be targeted
    toggle: '.js-toggle-navigation',
  };

  /**
   * The following behaviors work together to drive the flyout search
   * and flyout menu which appear on mobile and tablet breakpoints:
   * Drupal.behaviors.flyoutSearch
   * Drupal.behaviors.flyoutMenu
   */

  Drupal.behaviors.flyoutSearch = {
    attach: (context) => {
      fetchElementWithContext(searchTargets.toggle, context).once().on(clickTrigger, (event, context) => Drupal.behaviors.flyoutSearch.toggle(event, context));
    },
    toggle: (event, context) => {
      fetchElementWithContext(searchTargets.toggle, context).toggleClass('active');
      fetchElementWithContext(searchTargets.elem, context).toggleClass('search-is-active');
      $('#edit-query').focus(); // Custom search API
      $('#edit-keys').focus(); // Core search

      Drupal.behaviors.flyoutMenu.close(context); // Close navigation

      // update aria label
      fetchElementWithContext(searchTargets.toggle, context).attr({
        'aria-label': fetchElementWithContext(searchTargets.toggle, context).hasClass('active') ? 'Close search' : 'Open search',
        'aria-pressed': !!fetchElementWithContext(searchTargets.toggle, context).hasClass('active'),
      });
      event.preventDefault();
    },
    close: () => {
      $(searchTargets.toggle).removeClass('active');
      $(searchTargets.elem).removeClass('search-is-active');
      $('.search__input').blur(); // Custom search API
      $('#edit-keys').blur(); // Core search
    },
  };

  Drupal.behaviors.flyoutMenu = {
    attach: (context, settings) => {
      const breakpoints = { ...settings.responsive };

      Drupal.behaviors.flyoutSearch.close(context);

      // Toggle menu open/close
      fetchElementWithContext(flyoutMenuTargets.toggle, context).once().on(clickTrigger, context => Drupal.behaviors.flyoutMenu.toggle(context));

      // Loop through each menu that's a mobile menu target
      fetchElementWithContext(flyoutMenuTargets.elem, context).each((index, value) => {
        const menu = $(value);
        // Add is-open to all active-trail menu__items on load
        menu.find('.menu__item.active-trail').addClass('is-open');

        // For each expandable menu item, add an expander/contractor UI component
        menu.find('.is-expanded').each((index, value) => {
          const link = $(value).find('> .menu__link');
          $('<span />', {
            text: 'Expand',
            class: 'btn btn-expand',
          }).insertAfter(link).once().on(clickTrigger, (evt) => {
            $(evt.currentTarget).parent('.menu__item').toggleClass('is-open');
          });

          const submenu = menu.find('> .menu__container > .menu__wrapper');

          $('<a />', {
            href: link.attr('href'),
            text: link.text(),
            class: 'menu__leading-link',
          }).prependTo(submenu);
        });

        // Touch dropdown navigation
        if (breakpoints) {
          if (window.matchMedia(breakpoints['sector_starter.medium']).matches && Modernizr.touchevents) {
            const links = $('.expanded .menu__link', menu).not('.menu .menu .menu__link', menu);

            links.once().on('touchend', (evt) => {
              if (!$(evt.currentTarget).hasClass('js-opened')) {
                $(evt.currentTarget).addClass('js-opened');
                evt.preventDefault();
              }
            });
          }
        }
      });
    },
    toggle: (context) => {
      $(flyoutMenuTargets.toggle).toggleClass('active');
      $(flyoutMenuTargets.elem).toggleClass('navigation-is-open');
      $('.header').toggleClass('navigation-is-open');
      // Close search
      Drupal.behaviors.flyoutSearch.close(context);
    },
    close: () => {
      $(flyoutMenuTargets.toggle).removeClass('active');
      $('.header').removeClass('navigation-is-open');
      $(flyoutMenuTargets.elem).removeClass('navigation-is-open');
    },
  };
}(jQuery));
