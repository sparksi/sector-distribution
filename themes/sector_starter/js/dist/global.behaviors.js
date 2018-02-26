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

      /**
      * Move focus to search block input when mobile search toggle is touched.
      *
      */
      $(".js-toggle-search", context).on({
        click: function click() {
          $(".search__input").focus(); // Custom search API
          $("#edit-keys--2").focus(); // Core search
          return false;
        }
      });
    }
  };

  var _search = {
    region: $(".site.header"),
    elem: $(".search--flyout"),
    toggle: $(".js-toggle-search, .js-toggle-flyout-search")
  };

  Drupal.behaviors.flyoutSearch = {
    attach: function attach() {
      _search.toggle.on(click_trigger, Drupal.behaviors.flyoutSearch.toggle);
    },
    toggle: function toggle() {
      _search.toggle.toggleClass("active");
      _search.elem.toggleClass('search-is-active');
      $(".search__input").focus(); // Custom search API
      $("#edit-keys").focus(); // Core search

      Drupal.behaviors.flyoutMenu.close(); // close navigation
    },
    close: function close() {
      _search.toggle.removeClass('active');
      _search.elem.removeClass('search-is-active');
      $(".search__input").blur(); // Custom search API
      $("#edit-keys").blur(); // Core search      
    }
  };

  var _primary_navigation = {
    region: $(".site.header"),
    elem: $(".navigation--primary"),
    toggle: $(".js-toggle-navigation")
  };

  Drupal.behaviors.flyoutMenu = {
    attach: function attach(context, settings) {

      // toggle menu open/close
      _primary_navigation.toggle.on(click_trigger, Drupal.behaviors.flyoutMenu.toggle);

      // add is-open to all active-trail menu__items on load
      $(".menu__item.active-trail", _primary_navigation.elem).each(function () {
        $(this).addClass('is-open');
      });

      // for each expandable menu item, add an expander/contractor UI component
      $(".is-expanded", _primary_navigation.elem).each(function () {
        var _link = $(this).find("> .menu__link");
        $("<span />", {
          "text": "Expand",
          "class": "btn btn-expand"
        }).insertAfter(_link).on({
          click: function click() {
            $(this).parent(".menu__item").toggleClass("is-open");
          }
        });

        var submenu = $(this).find("> .menu__container > .menu__wrapper");

        $("<a />", {
          "href": _link.attr("href"),
          "text": _link.text(),
          "class": "menu__leading-link"
        }).prependTo(submenu);
      });

      // touch dropdown navigation
      var breakpoints = settings.responsive.breakpoints;
      if (breakpoints) {
        if (window.matchMedia(breakpoints["sector_starter.medium"]).matches && Modernizr.touchevents) {
          var links = $(".expanded .menu__link", ".touchevents .header .navigation").not(".menu .menu .menu__link", ".touchevents .header .navigation");
          links.on("touchend", function (evt) {
            if (!$(this).hasClass("js-opened")) {
              $(".js-opened", _primary_navigation.elem).removeClass("js-opened");
              $(this).addClass("js-opened");
              evt.preventDefault();
            }
          });
        }
      }
    },
    toggle: function toggle() {
      _primary_navigation.toggle.toggleClass('active');
      _primary_navigation.elem.toggleClass("navigation-is-open");

      // close search
      Drupal.behaviors.flyoutSearch.close();
    },
    close: function close() {
      _primary_navigation.toggle.removeClass('active');
      _primary_navigation.elem.removeClass("navigation-is-open");
    }
  };

  Drupal.behaviors.offRegionClick = {
    attach: function attach() {
      // Detect a click outside the element and hide.
      // https://css-tricks.com/dangers-stopping-event-propagation/
      $(document).on(click_trigger, function (event) {
        var region = $(event.target).closest(".site"); // section that was clicked

        if (!region.is(_primary_navigation.region)) {
          // if you clicked outside the section that the navigation lives
          Drupal.behaviors.flyoutMenu.close();
        }
        if (!region.is(_search.region)) {
          // if you clicked outside the section that the navigation lives
          Drupal.behaviors.flyoutSearch.close();
        }
      });
    }
  };
})(jQuery);