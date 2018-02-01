/**
 * Custom javascript
 *
 */
(function ($) {

  Drupal.behaviors.scrollHelpers = {
    attach: () => {
      /**
      * Add classes to the body when user scolls down and is near the bottom
      * Used in CSS to hide/show the back to top link.
      * Used in CSS to hide/show 'back to table of contents link' on multipages.
      *
      */
      const attachClassTo = $("body");
      const threshold = 1200;
      const classes = {
        down : "you-are-going-down",
        bottom : "you-are-near-the-bottom"
      };
      $(window).scroll(_addScrollClasses);
      $(window).resize(_addScrollClasses);

      function _addScrollClasses(){
        let _scrollTop = $(this).scrollTop();
        (_scrollTop > threshold) ? attachClassTo.addClass(classes.down) : attachClassTo.removeClass(classes.down);
        ((_scrollTop + $(window).height()) > ($(document).height() - 800)) ? attachClassTo.addClass(classes.bottom) : attachClassTo.removeClass(classes.bottom);
      }

    }
  };

  Drupal.behaviors.formEnhancements = {
    attach: (context) => {

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

      $("input.form-radio", context).change(function() {
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
        click: function () {
          $(".search__input").focus(); // Custom search API
          $("#edit-keys--2").focus(); // Core search
          return false;
        }
      });

    }
  };

  Drupal.behaviors.flyoutSearch = {
    attach: (context) => {

      let flyout = $(".search--flyout", context);
      let toggle = $(".js-toggle-search, .js-toggle-flyout-search", context);

      // Functions for tidyness
      function toggleFlyoutSearch() {
        flyout.toggleClass("search-is-active");
      }

      function hideFlyoutSearch() {
        flyout.removeClass("search-is-active");
        toggle.removeClass("active");
      }

      toggle.on({
        click: function () {
          $(this).toggleClass("active");
          toggleFlyoutSearch();
          $(".search__input").focus(); // Custom search API
          $("#edit-keys").focus(); // Core search
          return false;
        }
      });

      // Detect a click outside the element and hide.
      // https://css-tricks.com/dangers-stopping-event-propagation/
      $(document).on({
        click : function(event) {
          if (!$(event.target).closest(".search--flyout").length) {
            hideFlyoutSearch();
          }
        }
      });
    }
  };

  Drupal.behaviors.flyoutMenu = {
    attach: (context, settings) => {

      var _navigation = $(".header .navigation", context);
      var _navigation_toggle = $(".js-toggle-navigation", context);

      _navigation_toggle.on({
        click : function() {
          _navigation.toggleClass("navigation-is-open");
          $(this).toggleClass("active");
        }
      });

      $(".is-expanded", _navigation).each(function() {
        var _link = $(this).find("> .menu__link");
        $("<span />", {
          "text": "Expand",
          "class": "btn btn-expand"
        }).insertAfter(_link).on({
          click: function() {
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
      const breakpoints = settings.responsive.breakpoints;
      if(breakpoints) {
        if (window.matchMedia(breakpoints["sector_starter.medium"]).matches && Modernizr.touchevents) {
          var links = $(".expanded .menu__link", ".touchevents .header .navigation").not(".menu .menu .menu__link", ".touchevents .header .navigation");
          links.on("touchend", function (evt) {
            if (!$(this).hasClass("js-opened")) {
              $(".js-opened", _navigation).removeClass("js-opened");
              $(this).addClass("js-opened");
              evt.preventDefault();
            }
          });
        }
      }

      var flyout = $(".navigation--primary", context);
      var toggle = $(".js-toggle-navigation .icon--menu", context);

      // Functions for tidyness
      function toggleFlyoutMenu() {
        flyout.toggleClass("menu-is-active");
      }

      function hideFlyoutMenu() {
        flyout.removeClass("menu-is-active");
        toggle.removeClass("active");
      }

      toggle.on({
        click: function(evt) {
          $(this).toggleClass("active");
          toggleFlyoutMenu();
          evt.preventDefault();
        }
      });

      // Detect a click outside the element and hide.
      // https://css-tricks.com/dangers-stopping-event-propagation/
      $(document).on({
        click : function(event) {
          if (!$(event.target).closest(".navigation--primary").length) {
            hideFlyoutMenu();
          }
        }
      });
    }
  };
})(jQuery);
