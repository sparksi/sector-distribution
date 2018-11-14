'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Custom javascript
 *
 */
(function ($) {
  var clickTrigger = Modernizr.touch ? 'touchstart' : 'click';

  Drupal.behaviors.scrollHelpers = {
    attach: function attach(context) {
      /**
      * Add classes to the body when user scolls down and is near the bottom
      * Used in CSS to hide/show the back to top link.
      * Used in CSS to hide/show 'back to table of contents link' on multipages.
      */
      var attachClassTo = $('body');
      var threshold = 1200;
      var classes = {
        down: 'you-are-going-down',
        bottom: 'you-are-near-the-bottom'
      };

      function addScrollClasses() {
        var scrollTop = $(this).scrollTop();
        scrollTop > threshold ? attachClassTo.addClass(classes.down) : attachClassTo.removeClass(classes.down);
        scrollTop + $(window).height() > $(document).height() - 800 ? attachClassTo.addClass(classes.bottom) : attachClassTo.removeClass(classes.bottom);
      }

      $(window).scroll(addScrollClasses);
      $(window).resize(addScrollClasses);

      $('.action--back-to-top', context).on('click', function (evt) {
        var href = $(this).attr('href');
        $('html, body').animate({
          scrollTop: $(href).offset().top
        }, 800);
        evt.preventDefault();
      });
    }
  };

  Drupal.behaviors.formEnhancements = {
    attach: function attach(context) {
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
    }
  };

  /**
    * The following three behaviors work together to drive the flyout search
    * and flyout menu which appear on mobile and tablet breakpoints:
    * Drupal.behaviors.flyoutSearch
    * Drupal.behaviors.flyoutMenu
    * Drupal.behaviors.offRegionClick
    */

  var offclickRegions = []; // Whitelist of regions to prevent offclick event trigger

  /**
    * Flyout search
    */

  var searchTargets = {
    elem: $('.search--flyout'),
    toggle: $('.js-toggle-search, .js-toggle-flyout-search')
  };

  Drupal.behaviors.flyoutSearch = {
    attach: function attach() {
      searchTargets.toggle.on(clickTrigger, Drupal.behaviors.flyoutSearch.toggle);

      // Add this search's .site region to list of offclick 'whitelist'
      offclickRegions.push(searchTargets.elem.parents('.site'));
    },
    toggle: function toggle() {
      searchTargets.toggle.toggleClass('active');
      searchTargets.elem.toggleClass('search-is-active');
      $('#edit-query').focus(); // Custom search API
      $('#edit-keys').focus(); // Core search

      Drupal.behaviors.flyoutMenu.close(); // Close navigation

      // update aria label
      searchTargets.toggle.attr({
        'aria-label': searchTargets.toggle.hasClass('active') ? 'Close search' : 'Open search',
        'aria-pressed': !!searchTargets.toggle.hasClass('active')
      });
    },
    close: function close() {
      searchTargets.toggle.removeClass('active');
      searchTargets.elem.removeClass('search-is-active');
      $('.search__input').blur(); // Custom search API
      $('#edit-keys').blur(); // Core search
    }
  };

  /**
    * Flyout menu
    */

  var flyoutMenuTargets = {
    elem: $('.is-target-for-flyout-menu'), // Add this class to the menu block/s you wish to be targeted
    toggle: $('.js-toggle-navigation')
  };

  Drupal.behaviors.flyoutMenu = {
    attach: function attach(context, settings) {
      var breakpoints = _extends({}, settings.responsive);

      // Toggle menu open/close
      flyoutMenuTargets.toggle.on(clickTrigger, Drupal.behaviors.flyoutMenu.toggle);

      // Loop through each menu that's a mobile menu target
      flyoutMenuTargets.elem.each(function () {
        var menu = $(this);

        // Add is-open to all active-trail menu__items on load
        menu.find('.menu__item.active-trail').addClass('is-open');

        // For each expandable menu item, add an expander/contractor UI component
        menu.find('.is-expanded').each(function () {
          var link = $(this).find('> .menu__link');
          $('<span />', {
            text: 'Expand',
            class: 'btn btn-expand'
          }).insertAfter(link).on(clickTrigger, function () {
            $(this).parent('.menu__item').toggleClass('is-open');
          });

          var submenu = menu.find('> .menu__container > .menu__wrapper');

          $('<a />', {
            href: link.attr('href'),
            text: link.text(),
            class: 'menu__leading-link'
          }).prependTo(submenu);
        });

        // Touch dropdown navigation
        if (breakpoints) {
          if (window.matchMedia(breakpoints['sector_starter.medium']).matches && Modernizr.touchevents) {
            var links = $('.expanded .menu__link', menu).not('.menu .menu .menu__link', menu);

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
    toggle: function toggle() {
      flyoutMenuTargets.toggle.toggleClass('active');
      flyoutMenuTargets.elem.each(function () {
        $(this).toggleClass('navigation-is-open');
        $('.header').toggleClass('navigation-is-open');
      });

      // Close search
      Drupal.behaviors.flyoutSearch.close();
    },
    close: function close() {
      flyoutMenuTargets.toggle.removeClass('active');
      flyoutMenuTargets.elem.each(function () {
        $(this).removeClass('navigation-is-open');
        $('.header').removeClass('navigation-is-open');
      });
    }
  };

  /**
    * Off click for the flyout search and flyout menu
    */

  Drupal.behaviors.offRegionClick = {
    attach: function attach() {
      // Detect a click outside the element and hide.
      // https://css-tricks.com/dangers-stopping-event-propagation/
      $(document).on(clickTrigger, '.site', function (event) {
        var clickedRegion = $(event.target).closest('.site'); // Section that was clicked

        var match = offclickRegions.filter(function (region) {
          return region.is(clickedRegion);
        })[0];

        if (!match) {
          Drupal.behaviors.flyoutMenu.close();
          Drupal.behaviors.flyoutSearch.close();
        }
      });
    }
  };
})(jQuery);