/**
 * Custom javascript
 *
 */
(function ($) {
  const clickTrigger = Modernizr.touch ? 'touchstart' : 'click';

  Drupal.behaviors.scrollHelpers = {
    attach: (context) => {
      /**
      * Add classes to the body when user scolls down and is near the bottom
      * Used in CSS to hide/show the back to top link.
      * Used in CSS to hide/show 'back to table of contents link' on multipages.
      */
      const attachClassTo = $('body');
      const threshold = 1200;
      const classes = {
        down: 'you-are-going-down',
        bottom: 'you-are-near-the-bottom',
      };

      function addScrollClasses() {
        const scrollTop = $(this).scrollTop();
        (scrollTop > threshold) ? attachClassTo.addClass(classes.down) : attachClassTo.removeClass(classes.down);
        ((scrollTop + $(window).height()) > ($(document).height() - 800)) ? attachClassTo.addClass(classes.bottom) : attachClassTo.removeClass(classes.bottom);
      }

      $(window).scroll(addScrollClasses);
      $(window).resize(addScrollClasses);

      $('.action--back-to-top', context).on('click', function (evt) {
        const href = $(this).attr('href');
        $('html, body').animate({
          scrollTop: $(href).offset().top,
        }, 800);
        evt.preventDefault();
      });
    },
  };

  Drupal.behaviors.formEnhancements = {
    attach: (context) => {
      /**
       * Radios & Checkboxes.
       *
       * Add class="is-checked" to the parent element of checked inputs
       * on page load. The CSS uses this class to exaggerate checked input.
       */
      $('input:checked', context).closest('.form-type-radio, .form-type-checkbox').addClass('is-checked');

      /**
       * Radios.
       */
      $('input:radio', context).change(function () {
        $(this).closest('.fieldset-wrapper').find('.is-checked').removeClass('is-checked');
        $(this).closest('.form-type-radio').addClass('is-checked');
      });

      /**
       * Checkboxes.
       */
      $('input:checkbox', context).change(function () {
        $(this).closest('.form-type-checkbox').toggleClass('is-checked', this.checked);
      });
    },
  };

  /**
    * The following three behaviors work together to drive the flyout search
    * and flyout menu which appear on mobile and tablet breakpoints:
    * Drupal.behaviors.flyoutSearch
    * Drupal.behaviors.flyoutMenu
    * Drupal.behaviors.offRegionClick
    */

  const offclickRegions = []; // Whitelist of regions to prevent offclick event trigger

  /**
    * Flyout search
    */

  const searchTargets = {
    elem: $('.search--flyout'),
    toggle: $('.js-toggle-search, .js-toggle-flyout-search'),
  };

  Drupal.behaviors.flyoutSearch = {
    attach: () => {
      searchTargets.toggle.once().on(clickTrigger, Drupal.behaviors.flyoutSearch.toggle);
      //$('.js-toggle-search, .js-toggle-flyout-search').once().on(clickTrigger, Drupal.behaviors.flyoutSearch.toggle);

      // Add this search's .site region to list of offclick 'whitelist'
      offclickRegions.push(searchTargets.elem.parents('.site'));
    },
    toggle: (event) => {
      searchTargets.toggle.toggleClass('active');
      searchTargets.elem.toggleClass('search-is-active');
      $('#edit-query').focus(); // Custom search API
      $('#edit-keys').focus(); // Core search
      console.log('test');
      Drupal.behaviors.flyoutMenu.close(); // Close navigation

      // update aria label
      searchTargets.toggle.attr({
        'aria-label': searchTargets.toggle.hasClass('active') ? 'Close search' : 'Open search',
        'aria-pressed': !!searchTargets.toggle.hasClass('active'),
      });
      event.preventDefault();
    },
    close: () => {
      searchTargets.toggle.removeClass('active');
      searchTargets.elem.removeClass('search-is-active');
      $('.search__input').blur(); // Custom search API
      $('#edit-keys').blur(); // Core search
    },
  };

  /**
    * Flyout menu
    */

  const flyoutMenuTargets = {
    elem: $('.is-target-for-flyout-menu'), // Add this class to the menu block/s you wish to be targeted
    toggle: $('.js-toggle-navigation'),
  };

  Drupal.behaviors.flyoutMenu = {
    attach: (context, settings) => {
      const breakpoints = { ...settings.responsive, };

      // Toggle menu open/close
      flyoutMenuTargets.toggle.on(clickTrigger, Drupal.behaviors.flyoutMenu.toggle);

      // Loop through each menu that's a mobile menu target
      flyoutMenuTargets.elem.each(function () {
        const menu = $(this);

        // Add is-open to all active-trail menu__items on load
        menu.find('.menu__item.active-trail').addClass('is-open');

        // For each expandable menu item, add an expander/contractor UI component
        menu.find('.is-expanded').each(function () {
          const link = $(this).find('> .menu__link');
          $('<span />', {
            text: 'Expand',
            class: 'btn btn-expand',
          }).insertAfter(link).on(clickTrigger, function () {
            $(this).parent('.menu__item').toggleClass('is-open');
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

            links.on('touchend', function (evt) {
              if (!$(this).hasClass('js-opened')) {
                // $('.js-opened', _primary_navigation.elem).removeClass('js-opened');
                $(this).addClass('js-opened');
                evt.preventDefault();
              }
            });
          }
        }

        // Add this menu's .site region to list of offclick 'whitelist'
        offclickRegions.push(menu.parents('.site'));
      });
    },
    toggle: () => {
      flyoutMenuTargets.toggle.toggleClass('active');
      flyoutMenuTargets.elem.each(function () {
        $(this).toggleClass('navigation-is-open');
        $('.header').toggleClass('navigation-is-open');
      });

      // Close search
      Drupal.behaviors.flyoutSearch.close();
    },
    close: () => {
      flyoutMenuTargets.toggle.removeClass('active');
      flyoutMenuTargets.elem.each(function () {
        $(this).removeClass('navigation-is-open');
        $('.header').removeClass('navigation-is-open');
      });
    },
  };

  /**
    * Off click for the flyout search and flyout menu
    */

  Drupal.behaviors.offRegionClick = {
    attach: () => {
      // Detect a click outside the element and hide.
      // https://css-tricks.com/dangers-stopping-event-propagation/
      $(document).on(clickTrigger, '.site', (event) => {
        const clickedRegion = $(event.target).closest('.site'); // Section that was clicked

        const match = offclickRegions.filter(region => region.is(clickedRegion))[0];

        if (!match) {
          Drupal.behaviors.flyoutMenu.close();
          Drupal.behaviors.flyoutSearch.close();
        }
      });
    },
  };
}(jQuery));
