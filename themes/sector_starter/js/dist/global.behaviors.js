'use strict';

/**
 * Custom javascript
 *
 */
(function ($) {

  var click_trigger = Modernizr.touch ? 'touchstart' : 'click';

  Drupal.behaviors.scrollHelpers = {
    attach: function attach() {
      /**
      * Add classes to the body when user scolls down and is near the bottom
      * Used in CSS to hide/show the back to top link.
      * Used in CSS to hide/show 'back to table of contents link' on multipages.
      *
      */
      var attachClassTo = $("body");
      var threshold = 1200;
      var classes = {
        down: "you-are-going-down",
        bottom: "you-are-near-the-bottom"
      };
      $(window).scroll(_addScrollClasses);
      $(window).resize(_addScrollClasses);

      function _addScrollClasses() {
        var _scrollTop = $(this).scrollTop();
        _scrollTop > threshold ? attachClassTo.addClass(classes.down) : attachClassTo.removeClass(classes.down);
        _scrollTop + $(window).height() > $(document).height() - 800 ? attachClassTo.addClass(classes.bottom) : attachClassTo.removeClass(classes.bottom);
      }
    }
  };

  Drupal.behaviors.formEnhancements = {
    attach: function attach(context) {

      /**
      * Radios & Checkboxes
      * Add class="is-checked" to the parent element of checked inputs
      * on page load. The CSS uses this class to exaggerate checked input.
      *
      */

      /**
      * Radios
      */
      $("input:checked", context).parent(".form-type-radio, .form-type-checkbox").addClass("is-checked");

      $("input.form-radio", context).change(function () {
        if ($(this).prop("checked")) {
          $("input.form-radio").parent(".form-type-radio").removeClass("is-checked");
          $(this).parent(".form-type-radio").addClass("is-checked");
        }
      }).change();

      /**
      * Checkboxes
      */
      $("input:checkbox").change(function () {
        $(this).closest(".form-type-checkbox").toggleClass("is-checked", this.checked);
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

  var _offclick_regions = []; // Whitelist of regions to prevent offclick event trigger

  /**
    * Flyout search
    */

  var _search_targets = {
    elem: $(".search--flyout"),
    toggle: $(".js-toggle-search, .js-toggle-flyout-search")
  };

  Drupal.behaviors.flyoutSearch = {
    attach: function attach() {
      _search_targets.toggle.on(click_trigger, Drupal.behaviors.flyoutSearch.toggle);

      // Add this search's .site region to list of offclick 'whitelist'
      _offclick_regions.push(_search_targets.elem.parents('.site'));
    },
    toggle: function toggle() {
      _search_targets.toggle.toggleClass("active");
      _search_targets.elem.toggleClass('search-is-active');
      $(".search__input").focus(); // Custom search API
      $("#edit-keys").focus(); // Core search

      Drupal.behaviors.flyoutMenu.close(); // Close navigation
    },
    close: function close() {
      _search_targets.toggle.removeClass('active');
      _search_targets.elem.removeClass('search-is-active');
      $(".search__input").blur(); // Custom search API
      $("#edit-keys").blur(); // Core search
    }
  };

  /**
    * Flyout menu
    */

  var _flyout_menu_targets = {
    elem: $(".is-target-for-flyout-menu"), // Add this class to the menu block/s you wish to be targeted
    toggle: $(".js-toggle-navigation")
  };

  Drupal.behaviors.flyoutMenu = {
    attach: function attach(context, settings) {

      var breakpoints = settings.responsive.breakpoints;

      // Toggle menu open/close
      _flyout_menu_targets.toggle.on(click_trigger, Drupal.behaviors.flyoutMenu.toggle);

      // Loop through each menu that's a mobile menu target
      _flyout_menu_targets.elem.each(function () {
        var _menu = $(this);

        // Add is-open to all active-trail menu__items on load
        _menu.find(".menu__item.active-trail").addClass('is-open');

        // For each expandable menu item, add an expander/contractor UI component
        _menu.find(".is-expanded").each(function () {
          var _link = $(this).find("> .menu__link");
          $("<span />", {
            "text": "Expand",
            "class": "btn btn-expand"
          }).insertAfter(_link).on(click_trigger, function () {
            $(this).parent(".menu__item").toggleClass("is-open");
          });

          var submenu = _menu.find("> .menu__container > .menu__wrapper");

          $("<a />", {
            "href": _link.attr("href"),
            "text": _link.text(),
            "class": "menu__leading-link"
          }).prependTo(submenu);
        });

        // Touch dropdown navigation
        if (breakpoints) {
          if (window.matchMedia(breakpoints["sector_starter.medium"]).matches && Modernizr.touchevents) {
            var links = $(".expanded .menu__link", _menu).not(".menu .menu .menu__link", _menu);

            links.on("touchend", function (evt) {
              if (!$(this).hasClass("js-opened")) {
                $(".js-opened", _primary_navigation.elem).removeClass("js-opened");
                $(this).addClass("js-opened");
                evt.preventDefault();
              }
            });
          }
        }

        // Add this menu's .site region to list of offclick 'whitelist'
        _offclick_regions.push(_menu.parents('.site'));
      });
    },
    toggle: function toggle() {
      _flyout_menu_targets.toggle.toggleClass('active');
      _flyout_menu_targets.elem.each(function () {
        $(this).toggleClass("navigation-is-open");
      });

      // Close search
      Drupal.behaviors.flyoutSearch.close();
    },
    close: function close() {
      _flyout_menu_targets.toggle.removeClass('active');
      _flyout_menu_targets.elem.each(function () {
        $(this).removeClass("navigation-is-open");
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
      $(document).on(click_trigger, '.site', function (event) {

        var _clicked_region = $(event.target).closest(".site"); // Section that was clicked

        var match = _offclick_regions.filter(function (region) {
          return region.is(_clicked_region);
        })[0];

        if (!match) {
          Drupal.behaviors.flyoutMenu.close();
          Drupal.behaviors.flyoutSearch.close();
        }
      });
    }
  };
})(jQuery);