'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Flyouts javascript
 *
 */
(function ($) {
  var clickTrigger = Modernizr.touch ? 'touchstart' : 'click';

  var fetchElementWithContext = function fetchElementWithContext(className, context) {
    return $(className, context);
  };

  /**
   * Flyout search
   */

  var searchTargets = {
    elem: '.search--flyout',
    toggle: '.js-toggle-search, .js-toggle-flyout-search'
  };

  /**
   * Flyout menu
   */

  var flyoutMenuTargets = {
    elem: '.is-target-for-flyout-menu', // Add this class to the menu block/s you wish to be targeted
    toggle: '.js-toggle-navigation'
  };

  /**
   * The following behaviors work together to drive the flyout search
   * and flyout menu which appear on mobile and tablet breakpoints:
   * Drupal.behaviors.flyoutSearch
   * Drupal.behaviors.flyoutMenu
   */

  Drupal.behaviors.flyoutSearch = {
    attach: function attach(context) {
      fetchElementWithContext(searchTargets.toggle, context).once().on(clickTrigger, function (event, context) {
        return Drupal.behaviors.flyoutSearch.toggle(event, context);
      });
    },
    toggle: function toggle(event, context) {
      fetchElementWithContext(searchTargets.toggle, context).toggleClass('active');
      fetchElementWithContext(searchTargets.elem, context).toggleClass('search-is-active');
      $('#edit-query').focus(); // Custom search API
      $('#edit-keys').focus(); // Core search

      Drupal.behaviors.flyoutMenu.close(context); // Close navigation

      // update aria label
      fetchElementWithContext(searchTargets.toggle, context).attr({
        'aria-label': fetchElementWithContext(searchTargets.toggle, context).hasClass('active') ? 'Close search' : 'Open search',
        'aria-pressed': !!fetchElementWithContext(searchTargets.toggle, context).hasClass('active')
      });
      event.preventDefault();
    },
    close: function close() {
      $(searchTargets.toggle).removeClass('active');
      $(searchTargets.elem).removeClass('search-is-active');
      $('.search__input').blur(); // Custom search API
      $('#edit-keys').blur(); // Core search
    }
  };

  Drupal.behaviors.flyoutMenu = {
    attach: function attach(context, settings) {
      var breakpoints = _extends({}, settings.responsive);

      Drupal.behaviors.flyoutSearch.close(context);

      // Toggle menu open/close
      fetchElementWithContext(flyoutMenuTargets.toggle, context).once().on(clickTrigger, function (context) {
        return Drupal.behaviors.flyoutMenu.toggle(context);
      });

      // Loop through each menu that's a mobile menu target
      fetchElementWithContext(flyoutMenuTargets.elem, context).each(function (index, value) {
        var menu = $(value);
        // Add is-open to all active-trail menu__items on load
        menu.find('.menu__item.active-trail').addClass('is-open');

        // For each expandable menu item, add an expander/contractor UI component
        menu.find('.is-expanded').each(function (index, value) {
          var link = $(value).find('> .menu__link');
          $('<span />', {
            text: 'Expand',
            class: 'btn btn-expand'
          }).insertAfter(link).once().on(clickTrigger, function (evt) {
            $(evt.currentTarget).parent('.menu__item').toggleClass('is-open');
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
            console.log(links);

            links.once().on('touchend', function (evt) {
              if (!$(evt.currentTarget).hasClass('js-opened')) {
                $(evt.currentTarget).addClass('js-opened');
                evt.preventDefault();
              }
            });
          }
        }
      });
    },
    toggle: function toggle(context) {
      $(flyoutMenuTargets.toggle).toggleClass('active');
      $(flyoutMenuTargets.elem).toggleClass('navigation-is-open');
      $('.header').toggleClass('navigation-is-open');
      // Close search
      Drupal.behaviors.flyoutSearch.close(context);
    },
    close: function close() {
      $(flyoutMenuTargets.toggle).removeClass('active');
      $('.header').removeClass('navigation-is-open');
      $(flyoutMenuTargets.elem).removeClass('navigation-is-open');
    }
  };
})(jQuery);